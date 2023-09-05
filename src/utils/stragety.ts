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
    StrategyBodyParams,
    StrategyState,
    SocketsParams
} from './types'
import {setAvailableAccounts} from './storage'
import {log} from 'console'
import {stringify} from '../utils/stringify'
import ReplaySocket from '../websockets/ReplaySocket'

export default class Strategy {
    private tvSocket: TvSocket
    private mdSocket: MdSocket
    private replaySocket: ReplaySocket
    private model
    private mw
    private mws: any[]

    // private underlyingType: BarType
    // private elementSize
    // private contract: Contract
    // private elementSizeUnit
    // private timeRangeType
    // private timeRangeValue
    // private withHistogram
    private replayMode: boolean
    // private replaySpeed
    // private replayPeriods

    private props: StrategyProps

    private D: Dispatcher

    constructor<T>(
        params: StrategyBodyParams,
        sockets: SocketsParams,
        init: () => T,
        next: (prevState: StrategyState, action: Action) => EventHandlerResults<T>
    ) {
        if (params.replayMode && (!params.replayPeriods || !sockets.replaySocket))
            throw new Error(
                'Strategy: tried to enter replayMode but replaySpeed or replaySocket not passed'
            )

        this.tvSocket = sockets.tvSocket
        this.mdSocket = sockets.mdSocket
        this.replaySocket = sockets.replaySocket

        this.replayMode = params.replayMode

        this.mws = [] // .init() function of subclass can add middleware to by calling .addMiddleware

        this.model = {
            ...init(),
            current_period: this.replayMode ? 0 : undefined
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
            reducer: next.bind(this),
            mw: this.mw
        })

        this.props = {
            ...params,
            replayPeriods: params.replayPeriods ?? [],
            replaySpeed: params.replaySpeed ?? 400,
            dispatcher: this.D
        }

        if (this.replayMode) {
            this.replayModeSetup()
        } else {
            this.setupEventCatcher(this.tvSocket, this.mdSocket)
        }
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

    private async nextReplayPeriod() {
        await this.replaySocket.connect()
        await this.replayModeSetup()
    }

    private async replayModeSetup() {
        const {replayPeriods} = this.props
        try {
            log('[DevX Trader]: Checking new replay period...')
            await this.replaySocket.checkReplaySession(replayPeriods[0].start)

            const subscription = (item: any) => {
                if (item.e === 'clock' && item.d.length < 40) {
                    log('current speed', item)
                    try {
                        this.replaySocket.request({
                            url: 'replay/changespeed',
                            body: {speed: (this.props.replaySpeed as number) ?? 400}
                        })

                        log(
                            `[DevX Trader]: Replay socket speed restored to ${this.props.replaySpeed}`
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

            await this.replaySocket.initializeClock(
                replayPeriods[0].start,
                undefined,
                undefined,
                subscription
            )
            const accountRes = await this.replaySocket.request({
                url: 'account/list'
            })

            const account = accountRes.d.find(account => account.active)
            await this.setupEventCatcher(this.replaySocket, this.replaySocket)
            setAvailableAccounts([account!])

            log(`[DevX Trader]: account: ${stringify(account)}`)
        } catch (err) {
            log(`[DevX Trader]: replayModeSetup: ${err}`)
        }
    }

    private async setupEventCatcher(socket: TvSocket, mdSocket: MdSocket) {
        const {
            contract,
            underlyingType,
            elementSize,
            elementSizeUnit,
            timeRangeType,
            timeRangeValue,
            withHistogram,
            dispatcher
        } = this.props

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
            this.generateSubscription(TdEventType.Chart, this.props)
        )
        mdSocket.subscribeDOM(
            contract.name,
            this.generateSubscription(TdEventType.DOM, this.props)
        )

        mdSocket.subscribeQuote(
            contract.name,
            this.generateSubscription(TdEventType.Quote, this.props)
        )
        socket.synchronize({
            onSubscription: data => {
                if (data.users) {
                    this.runSideFx()
                    dispatcher.dispatch(TdEventType.UserSync, {
                        data,
                        props: this.props
                    })
                } else if (data.entityType) {
                    this.runSideFx()
                    dispatcher.dispatch(TdEventType.Props, {
                        data,
                        props: this.props
                    })
                }
            }
        })

        socket.addListener((item: any) => {
            if (isServerEvent(item) && item.e === TdEventType.Clock) {
                this.runSideFx()
                dispatcher.dispatch(TdEventType.Clock, {data: item.d, props: this.props})
            }
        })
    }

    generateSubscription(eventType: TdEventType, props: StrategyProps) {
        const subscription = (data: any) => {
            this.runSideFx()
            this.D.dispatch(eventType, {
                data,
                props
            })
        }
        return subscription
    }

    addMiddleware(...mws: any[]) {
        mws.forEach((mw: any) => this.mws.push(mw))
    }

    catchReplaySessionsDefault(
        prevState: StrategyState,
        action: Action
    ): EventHandlerResults<T> {
        const {event, payload} = action
        const {data, props} = payload

        if (event === 'stop') {
            log('LOOK AT WHEN event === stop')
            // const socket = getReplaySocket()
            // const ws = socket.getSocket()
            // ws.close()
            // ws.removeAllListeners('message')
            //this.shouldRun = false
            return {state: prevState, effects: []}
        }

        if (event === TdEventType.ReplayReset) {
            this.nextReplayPeriod
            return {state: prevState, effects: []}
        }

        if (event === TdEventType.Clock) {
            const {current_period} = prevState
            const {replayPeriods} = props
            const {t} = JSON.parse(data as unknown as string)

            const curStop = new Date(replayPeriods[current_period!]?.stop)?.toJSON()

            if (curStop && new Date(t) > new Date(curStop)) {
                log('[DevX Trader}: Go to next replay')
                if (current_period === replayPeriods.length) {
                    log('[DevX Trader]: Dispatched replay complete]')
                    return {
                        state: prevState,
                        effects: [
                            {
                                event: TdEventType.ReplayComplete,
                                payload: {data: {}, props}
                            }
                        ]
                    }
                }

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
