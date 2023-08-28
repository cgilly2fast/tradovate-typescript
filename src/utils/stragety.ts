import {nextReplayPeriod} from '../websocketMiddleware/nextReplayPeriod'
import {placeOCO} from '../websocketMiddleware/placeOCO'
import {placeOrder} from '../websocketMiddleware/placeOrder'
import {productFind} from '../websocketMiddleware/findProduct'
import {replayComplete} from '../websocketMiddleware/replayComplete'
import {startOrderStrategy} from '../websocketMiddleware/startOrderStrategy'
import Dispatcher, {pipeMiddleware} from './dispatcher'
import {getSocket, getMdSocket, getReplaySocket} from './socketUtils'
import {
    TdEventType,
    BarType,
    Contract,
    Action,
    EventHandlerResults,
    isServerEvent,
    StrategyProps,
    TvSocket,
    MdSocket,
    TimeRange,
    StrategyParams,
    StrategyState
} from './types'
import {setAvailableAccounts} from './storage'
import {log} from 'console'
import {stringify} from '../utils/stringify'

export default class Strategy {
    private socket
    private mdSocket
    private replaySocket
    private model
    private mw
    private mws: any[]

    private underlyingType: BarType
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
        if (props.devMode && (!props.replaySpeed || !props.replayPeriods))
            throw new Error(
                'Strategy: tried to enter devMode but replaySpeed or replayPeriods not passed'
            )
        this.socket = getSocket()
        this.mdSocket = getMdSocket()
        this.replaySocket = getReplaySocket()
        this.shouldRun = true

        this.underlyingType = props.underlyingType
        this.elementSize = props.elementSize
        this.contract = props.contract
        this.elementSizeUnit = props.elementSizeUnit
        this.timeRangeType = props.timeRangeType
        this.timeRangeValue = props.timeRangeValue
        this.withHistogram = props.withHistogram
        this.devMode = props.devMode
        this.replayPeriods = props.replayPeriods ?? []
        this.replaySpeed = props.replaySpeed ?? 400

        this.mws = [] // .init() function of subclass can add middleware to by calling .addMiddleware

        this.model = {
            ...this.init(),
            current_period: this.devMode ? 0 : undefined
        }

        this.mw = pipeMiddleware(
            startOrderStrategy,
            placeOrder,
            placeOCO,
            productFind,
            nextReplayPeriod,
            replayComplete,
            ...this.mws
        )

        this.D = new Dispatcher({
            model: this.model,
            reducer: this.next.bind(this),
            mw: this.mw
        })

        if (this.devMode) {
            this.devModeSetup(this.getProps(props))
        } else {
            this.setupEventCatcher(
                this.D,
                this.socket,
                this.mdSocket,
                this.getProps(props)
            )
        }
    }

    init(): StrategyState {
        return {}
    }

    runSideFx = () => {
        const effects = this.D.effects()

        if (effects && effects.length && effects.length > 0) {
            effects.forEach((fx: Action) => {
                log(
                    '[DevX Trader]: Side Effect:',
                    fx.event,
                    JSON.stringify(fx.payload.data, null, 2)
                )
                this.D.dispatch(fx.event, {
                    data: fx.payload.data,
                    props: fx.payload.props
                })
            })
        }
    }

    private async devModeSetup(props: StrategyProps) {
        try {
            try {
                log('[DevX Trader]: Checking new replay period...')
                await this.replaySocket.checkReplaySession(this.replayPeriods[0].start)
            } catch (err) {
                log(
                    '[DevX Trader]: Could not initialize replay session. Check that your replay periods are within a valid time frame and that you have Market Replay access.'
                )
                throw err
            }
            await this.replaySocket.initializeClock(
                this.replayPeriods[0].start,
                undefined,
                undefined,
                item => {
                    if (item.e === 'clock' && item.d.length < 40) {
                        log('current speed', item)
                        try {
                            this.replaySocket.request({
                                url: 'replay/changespeed',
                                body: {speed: (props.replaySpeed as number) ?? 400}
                            })

                            log(
                                `[DevX Trader]: Replay socket speed restored to ${props.replaySpeed}`
                            )
                        } catch (err) {
                            log(
                                `[DevX Trader]: Error Replay socket speed restoration ${stringify(
                                    item
                                )}`
                            )
                            log(err)
                        }
                    }
                }
            )
            const accountRes = await this.replaySocket.request({
                url: 'account/list'
            })

            const account = accountRes.d.find(account => account.active)

            setAvailableAccounts([account!])

            log(`[DevX Trader]: account: ${stringify(account)}`)
        } catch (err) {
            log(`[DevX Trader]: devModeSetup: ${err}`)
        }
    }
    private getProps(props: StrategyParams): StrategyProps {
        return {
            ...props,
            underlyingType: this.underlyingType,
            elementSize: this.elementSize,
            contract: this.contract,
            elementSizeUnit: this.elementSizeUnit,
            timeRangeType: this.timeRangeType,
            timeRangeValue: this.timeRangeValue,
            withHistogram: this.withHistogram,
            devMode: this.devMode,
            replaySpeed: this.replaySpeed,
            replayPeriods: this.replayPeriods,
            dispatcher: this.D
        }
    }

    private async setupEventCatcher(
        D: Dispatcher,
        socket: TvSocket,
        mdSocket: MdSocket,
        props: StrategyProps
    ) {
        const {
            contract,
            underlyingType,
            elementSize,
            elementSizeUnit,
            timeRangeType,
            timeRangeValue,
            withHistogram
        } = props

        socket.synchronize({
            onSubscription: data => {
                if (data.users) {
                    if (!this.shouldRun) return
                    this.runSideFx()
                    D.dispatch(TdEventType.UserSync, {
                        data,
                        props
                    })
                } else if (data.entityType) {
                    if (!this.shouldRun) return
                    this.runSideFx()
                    D.dispatch(TdEventType.Props, {
                        data,
                        props
                    })
                }
            }
        })

        socket.addListener((item: any) => {
            if (isServerEvent(item) && item.e === TdEventType.Clock) {
                if (!this.shouldRun) return
                this.runSideFx()
                D.dispatch(TdEventType.Clock, {data: item.d, props})
            }
        })

        mdSocket.subscribeDOM(contract.name, (data: any) => {
            if (!this.shouldRun) return
            this.runSideFx()
            D.dispatch(TdEventType.DOM, {
                data,
                props
            })
        })

        mdSocket.subscribeQuote(contract.name, (data: any) => {
            if (!this.shouldRun) return
            this.runSideFx()
            D.dispatch(TdEventType.Quote, {
                data,
                props
            })
        })

        const chartDescription = {
            underlyingType: underlyingType,
            elementSize: elementSize,
            elementSizeUnit,
            withHistogram
        }

        const timeRange: TimeRange = {
            [timeRangeType]:
                timeRangeType === 'asMuchAsElements' || timeRangeType === 'closestTickId'
                    ? timeRangeValue
                    : timeRangeValue.toString()
        }

        mdSocket.subscribeChart(
            contract.name,
            chartDescription,
            timeRange,
            (data: any) => {
                if (!this.shouldRun) return
                this.runSideFx()
                D.dispatch(TdEventType.Chart, {
                    data,
                    props
                })
            }
        )
    }

    addMiddleware(...mws: any[]) {
        mws.forEach((mw: any) => this.mws.push(mw))
    }

    next(prevState: StrategyState, action: Action) {
        log(prevState, action)
    }

    catchReplaySessionsDefault(
        prevState: StrategyState,
        action: Action
    ): EventHandlerResults {
        const {event, payload} = action
        const {data, props} = payload
        if (event === 'stop') {
            log('LOOK AT WHEN event === stop')
            // const socket = getReplaySocket()
            // const ws = socket.getSocket()
            // ws.close()
            // ws.removeAllListeners('message')
            this.shouldRun = false
            return {state: prevState, effects: []}
        }

        if (event === TdEventType.ReplayReset) {
            const replaySocket = getReplaySocket()
            this.setupEventCatcher(props.dispatcher, replaySocket, replaySocket, props)
            return {state: prevState, effects: []}
        }

        if (event === TdEventType.Clock) {
            const {current_period} = prevState
            const {replayPeriods} = props
            const {t} = JSON.parse(data as string)

            const curStop = new Date(replayPeriods[current_period!]?.stop)?.toJSON()

            if (curStop && new Date(t) > new Date(curStop)) {
                return {
                    state: {...prevState, current_period: current_period! + 1},
                    effects: [
                        {
                            event: TdEventType.NextReplay,
                            payload: {data: {}, props}
                        }
                    ]
                }
            }
        }
        return {state: prevState, effects: []}
    }
}
