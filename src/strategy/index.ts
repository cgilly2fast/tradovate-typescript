import Dispatcher from '../utils/dispatcher'
import {
    StrategyEvent,
    Action,
    EventHandlerResults,
    isServerEvent,
    TvSocket,
    MdSocket,
    TimeRange,
    StrategyParams,
    StrategyState,
    isClockEventMsg,
    Quote,
    DOM,
    CustomActionTemplate,
    Chart
} from '../types'
import {log} from 'console'
import {stringify} from '../utils/stringify'
import ReplaySocket from '../websockets/ReplaySocket'
import TradovateSocket from '../websockets/TradovateSocket'
import MarketDataSocket from '../websockets/MarketDataSocket'

/**
 * Represents a trading.
 * @template T - The type for strategy parameters.
 * @template U - The type for strategy state.
 */
export default class Strategy<T extends StrategyParams, U extends StrategyState> {
    private tvSocket: TvSocket
    private mdSocket: MdSocket
    private replaySocket?: ReplaySocket
    private model
    private live

    private replayMode: boolean

    private props: Required<T>

    private D: Dispatcher<U>
    /**
     * Creates a new instance of the Strategy class.
     * @param params - The parameters for initializing the strategy.
     * @param initState - The initial state of the strategy.
     * @param next - The function to handle and update the strategy state based on actions.
     * @throws Throws an error if required parameters are missing in replay mode.
     */
    constructor(
        params: T,
        initState: U,
        next: (
            prevState: U,
            action: Action | CustomActionTemplate<any, any>
        ) => EventHandlerResults<U>
    ) {
        this.replayMode = params.replayMode

        if (
            this.replayMode &&
            (!params.replayPeriods || params.replayPeriods.length === 0)
        )
            throw new Error(
                'Strategy: tried to enter replayMode but replaySpeed or replaySocket not passed'
            )
        this.live = params.live

        if (this.replayMode) {
            this.tvSocket = this.mdSocket = this.replaySocket = new ReplaySocket()
        } else {
            this.tvSocket = new TradovateSocket(this.live)
            this.mdSocket = new MarketDataSocket()
            this.replaySocket = undefined
        }

        this.model = {
            ...initState,
            current_period: this.replayMode ? 0 : undefined
        }

        this.D = new Dispatcher({
            model: this.model,
            reducer: next.bind(this)
        })

        this.props = {
            ...params,
            replayPeriods: params.replayPeriods ?? [],
            replaySpeed: params.replaySpeed ?? 400
        } as Required<T>

        if (this.replayMode) {
            this.replayModeSetup()
        } else {
            this.setupEventCatcher(this.tvSocket, this.mdSocket)
        }
    }
    /**
     * Runs side effects based on the actions processed by the strategy.
     */
    runSideFx = () => {
        const actions = this.D.actions()

        if (actions && actions.length && actions.length > 0) {
            actions.forEach((fx: Action) => {
                log(
                    '[Tradovate]: Side Effect:',
                    fx.event,
                    JSON.stringify(fx.payload, null, 2)
                )
                this.D.dispatch(fx)
            })
        }
    }

    private async nextReplayPeriod() {
        if (this.replayMode) {
            await this.replaySocket!.connect()
            await this.replayModeSetup()
        }
    }

    private async replayModeSetup() {
        const {replayPeriods} = this.props
        try {
            log('[Tradovate]: Checking new replay period...')
            await this.replaySocket!.checkReplaySession(replayPeriods![0].start)

            const subscription = (item: any) => {
                if (item.e === 'clock' && item.d.length < 40) {
                    log('current speed', item)
                    try {
                        this.replaySocket!.request({
                            url: 'replay/changespeed',
                            body: {speed: (this.props.replaySpeed as number) ?? 400}
                        })

                        log(
                            `[Tradovate]: Replay socket speed restored to ${this.props.replaySpeed}`
                        )
                    } catch (err) {
                        log(
                            `[Tradovate]: Error Replay socket speed restoration ${stringify(
                                item
                            )}`
                        )
                        log(err)
                    }
                }
            }

            await this.replaySocket!.initializeClock(
                replayPeriods![0].start,
                undefined,
                undefined,
                subscription
            )
            const accountRes = await this.replaySocket!.request({
                url: 'account/list'
            })

            const account = accountRes.d.find(account => account.active)
            log('replay account test ' + account)
            await this.setupEventCatcher(this.replaySocket!, this.replaySocket!)
            //setAvailableAccounts([account!])

            log(`[Tradovate]: account: ${stringify(account)}`)
        } catch (err) {
            log(`[Tradovate]: replayModeSetup: ${err}`)
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
            withHistogram
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
            (data: Chart) => {
                this.runSideFx()
                this.D.dispatch({event: StrategyEvent.Chart, payload: data})
            }
        )
        mdSocket.subscribeDOM(contract.name, (data: DOM) => {
            this.runSideFx()
            this.D.dispatch({event: StrategyEvent.DOM, payload: data})
        })

        mdSocket.subscribeQuote(contract.name, (data: Quote) => {
            this.runSideFx()
            this.D.dispatch({event: StrategyEvent.Quote, payload: data})
        })

        socket.synchronize({
            onSubscription: data => {
                if (data.users) {
                    this.runSideFx()
                    this.D.dispatch({event: StrategyEvent.UserSync, payload: data})
                } else if (data.entityType) {
                    this.runSideFx()
                    this.D.dispatch({event: StrategyEvent.Props, payload: data})
                }
            }
        })

        socket.addListener((item: any) => {
            if (isServerEvent(item) && isClockEventMsg(item.d)) {
                this.runSideFx()
                this.D.dispatch({event: StrategyEvent.Clock, payload: item.d})
            }
        })
    }
    /**
     * Retrieves the request socket associated with the strategy.
     * @returns The request socket used for communication.
     */
    getRequestSocket() {
        return this.tvSocket
    }
    /**
     * Default implementation for handling replay sessions and clock events.
     * @param prevState - The previous state of the strategy.
     * @param action - The action to process.
     * @returns An object containing the updated state and actions to perform.
     */
    catchReplaySessionsDefault(
        prevState: U,
        action: Action | CustomActionTemplate<any, any>
    ): EventHandlerResults<U> {
        const {event, payload} = action
        const {data, props} = payload

        if (event === StrategyEvent.Stop) {
            log('LOOK AT WHEN event === stop')
            //this.shouldRun = false
            return {state: prevState, actions: []}
        }

        if (event === StrategyEvent.ReplayReset) {
            this.nextReplayPeriod
            return {state: prevState, actions: []}
        }

        if (event === StrategyEvent.Clock) {
            const {current_period} = prevState
            const {replayPeriods} = props
            const {t} = JSON.parse(data)

            const curStop = new Date(replayPeriods[current_period!]?.stop)?.toJSON()

            if (curStop && new Date(t) > new Date(curStop)) {
                log('[DevX Trader}: Go to next replay')
                if (current_period === replayPeriods.length) {
                    log('[Tradovate]: Dispatched replay complete]')
                    return {
                        state: prevState,
                        actions: [
                            {
                                event: StrategyEvent.ReplayComplete,
                                payload: {}
                            }
                        ]
                    }
                }

                return {
                    state: {...prevState, current_period: current_period! + 1},
                    actions: [
                        {
                            event: StrategyEvent.NextReplay,
                            payload: {}
                        }
                    ]
                }
            }
        }
        return {state: prevState, actions: []}
    }
}
