import { drawReplayStats }                           from "../websocketMiddleware/drawReplayStats"
import { nextReplayPeriod }                          from "../websocketMiddleware/nextReplayPeriod"
import { placeOCO }                                  from "../websocketMiddleware/placeOCO"
import { placeOrder }                                from "../websocketMiddleware/placeOrder"
import { productFind }                               from "../websocketMiddleware/findProduct"
import { replayComplete }                            from "../websocketMiddleware/replayComplete"
import { startOrderStrategy }                        from "../websocketMiddleware/startOrderStrategy"
import Dispatcher, {  pipeMiddleware  }        from "./dispatcher"
import { getSocket, getMdSocket, getReplaySocket }   from "./socketUtils" //remove
import { URLs } from '../config/tvCredentials'
import {TdEvent, BarType, TimeRangeType, Contract, ChartDescription, Action, EventHandlerResults}   from "./types"
import TradovateSocket from "../websockets/TradovateSocket"
import MarketDataSocket from "../websockets/MarketDataSocket"
import ReplaySocket from "../websockets/ReplaySocket"
import {setAvailableAccounts} from "./storage"



export interface StrategyParams extends ChartDescription{
    contract:Contract
    timeRangeType: TimeRangeType
    timeRangeValue: number
    devMode:boolean
    replayPeriods?: any[]
    replaySpeed?:number
    dispatcher?: any
}
export default class Strategy {
    private socket
    private mdSocket
    private replaySocket
    private model
    private mw
    private mws:any[]

    private underlyingType:BarType
    private elementSize
    private contract: Contract
    private elementSizeUnit
    private timeRangeType
    private timeRangeValue
    private withHistogram
    private devMode
    private replaySpeed
    private replayPeriods
    

    private shouldRun
    private D: Dispatcher
    

    constructor(props: StrategyParams) {
        this.socket = getSocket()
        this.mdSocket = getMdSocket()
        this.replaySocket =  getReplaySocket()
        this.shouldRun = true;
        
        this.underlyingType = props.underlyingType;
        this.elementSize = props.elementSize;
        this.contract  = props.contract;
        this.elementSizeUnit = props.elementSizeUnit;
        this.timeRangeType = props.timeRangeType;
        this.timeRangeValue = props.timeRangeValue;
        this.withHistogram = props.withHistogram;
        this.devMode = props.devMode
        this.replayPeriods = props.replayPeriods ?? []
        this.replaySpeed = props.replaySpeed ?? 400
        
        this.mws = [] // .init() function of subclass can add middleware to by calling .addMiddleware

        this.model = { ...this.init(), current_period: this.devMode ? 0 : undefined }

        this.mw = pipeMiddleware(
            startOrderStrategy, 
            placeOrder, 
            placeOCO, 
            productFind,
            nextReplayPeriod,
            replayComplete,
            drawReplayStats,
            ...this.mws
        )

        //builds a dispatcher from our model, using subclass' next function as the reducer,
        //and the above middleware composition for side effecting functions (websocket reqs, etc)
        this.D = new Dispatcher({ model:this.model, reducer: this.next.bind(this), mw:this.mw })

        props.dispatcher = this.D //add dispatcher to 'props' dependencies object.

        if(this.devMode) {
            this.devModeSetup(props)
        } else {
            this.setupEventCatcher(this.D, this.socket, this.mdSocket, props)
        }
    }

    init():{[k:string]:any} {
        return {}
    }

    runSideFx = ()=>{
        let effects = this.D.effects()
        
        if(effects && effects.length && effects.length > 0) {
            effects.forEach((fx: Action) => {
                console.log("[DevX Trader]: Side Effect:",fx.event, JSON.stringify(fx.payload.data, null, 2))
                this.D.dispatch(fx.event, {data: fx.payload.data, props:fx.payload.props})
            })
        }
    }  

    private async devModeSetup(props: StrategyParams) {
        try {
            await this.replaySocket.checkReplaySession({
                startTimestamp: this.replayPeriods[0].start,
                callback: async (item:any) => { //TODO: cb hell, this should be reorganized eventually
                    if(!item.checkStatus && item.checkStatus !== 'OK') 
                        throw new Error('Could not initialize replay session. Check that your replay periods are within a valid time frame and that you have Market Replay access.')
                }
            })
            await this.replaySocket.initializeClock({
                startTimestamp: this.replayPeriods[0].start,
                callback: (item:any) => {  
                    if(item && item.e === "clock" && item.d.length < 40) {
                        this.replaySocket.request({
                            url:'replay/changespeed',
                            body:{"speed": this.replaySpeed},
                            onResponse: (id, r) => {
                                if(id === r.i) {
                                    if(r.s === 200) {
                                        console.log(`[DevX Trader]: Replay socket speed restored to ${this.replaySpeed}`)
                                    } else {
                                        console.log('[DevX Trader]: Error Replay socket speed restoration ' +JSON.stringify(r, null, 2))
                                    }
                                }
                            }
                        })
                    }
                    return
                }
            })
            await this.replaySocket.request({
                url: 'account/list',
                onResponse: (id:any, item:any) => {
                    if(id === item.i) {
                        const accounts = item.d
                        const account = accounts.find((acct:any) => acct.active)
                        setAvailableAccounts([account])
                        this.setupEventCatcher(this.D, this.replaySocket, this.replaySocket, props)
                    
                    }
                }
            })
        } catch (err) {
            console.log(`[DevX Trader]: devModeSetup: ${err}`)
            
        }
    }
    private getProps():StrategyParams {
        return{
            underlyingType: this.underlyingType,
            elementSize: this.elementSize,
            contract: this.contract,
            elementSizeUnit:this.elementSizeUnit,
            timeRangeType: this.timeRangeType,
            timeRangeValue: this.timeRangeValue,
            withHistogram: this.withHistogram,
            devMode: this.devMode,
            replayPeriods: this.replayPeriods,
            dispatcher: this.D
        }
    }

    private async setupEventCatcher(D:Dispatcher, socket:TradovateSocket, mdSocket:MarketDataSocket, props:StrategyParams) {
        const { contract, underlyingType, elementSize, elementSizeUnit, timeRangeType, timeRangeValue, withHistogram } = props

        socket.synchronize((data:any) => {
            if(data.users) {
                if(!this.shouldRun) return
                this.runSideFx()           
                D.dispatch(TdEvent.UserSync, {
                    data,
                    props,
                })         
            }
            else if(data.entityType) {
                if(!this.shouldRun) return
                this.runSideFx()
                D.dispatch(TdEvent.Props, {
                    data,
                    props,
                })
            }
        })

        socket.ws.addEventListener('message', (msg:any) => {
            if(msg.data.slice(1)) {
                let data
                try {
                    data = JSON.parse(msg.data.slice(1))
                } catch(err:any) {
                    throw new Error(err)
                }
                data.forEach((item:any) => {
                    if(item.e && item.e === TdEvent.Clock) {
                        if(!this.shouldRun) return
                        this.runSideFx()
                        D.dispatch(TdEvent.Clock, { data: item.d, props })
                    }
                })
            }
        })

        mdSocket.subscribeDOM({
            symbol: contract.name,
            contractId: contract.id,
            callback: (data:any) => {              
                if(!this.shouldRun) return
                this.runSideFx()
                D.dispatch(TdEvent.DOM, {
                    data,
                    props,
                })
            }
        })

        mdSocket.subscribeQuote({
            symbol: contract.name,
            contractId: contract.id,
            callback: (data:any) => {             
                if(!this.shouldRun) return
                this.runSideFx()
                D.dispatch(TdEvent.Quote, {
                    data,
                    props,
                })
            }
        })

        mdSocket.getChart({
            symbol: contract.name,
            chartDescription: {
                underlyingType: underlyingType,
                elementSize: elementSize,
                elementSizeUnit,
                withHistogram
            },
            timeRange: {
                [timeRangeType]: 
                    timeRangeType === 'asMuchAsElements' 
                    || timeRangeType === 'closestTickId' 
                        ? timeRangeValue 
                        : timeRangeValue.toString()
            },
            callback: (data:any) => {                    
                if(!this.shouldRun) return
                this.runSideFx()
                D.dispatch(TdEvent.Chart, {
                    data,
                    props,
                })
            }
        })
    }

    addMiddleware(...mws:any[]) {
        mws.forEach((mw:any) => this.mws.push(mw))
    }

    next(prevState:{[k:string]:any},action:Action) {
        
    }

    catchReplaySessionsDefault(prevState:any, action:Action):EventHandlerResults {
            const {event, payload} = action
            const {data, props} = payload
            if(event === 'stop') {
                console.log("LOOK AT WHEN event === stop")
                // const socket = getReplaySocket()
                // const ws = socket.getSocket()
                // ws.close()
                // ws.removeAllListeners('message')
                this.shouldRun = false
                return {state:prevState, effects:[]}
            }
            
            if(event === TdEvent.ReplayReset) {
                const replaySocket = getReplaySocket()
                this.setupEventCatcher(props.dispatcher, replaySocket, replaySocket, props)
                return {state:prevState, effects:[]}
            }

            if(event === TdEvent.Clock) {

                const { current_period } = prevState
                const { replayPeriods } = props
                const { t, s } = JSON.parse(data)
                

                const curStop = new Date(replayPeriods[current_period]?.stop)?.toJSON()

                if(curStop && new Date(t) > new Date(curStop)) {
                    return { 
                        state: { ...prevState, current_period: current_period+1 },
                        effects: [{ event: TdEvent.NextReplay, payload: { data: {}, props } }]
                    }   
                }
            }
            return {state:prevState, effects:[]}
    }
   
}
