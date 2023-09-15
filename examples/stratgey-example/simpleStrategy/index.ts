import {
    StrategyState,
    LongShortMode,
    DataBuffer,
    BarsTransformer,
    StrategyParams,
    Strategy,
    barsTransformer,
    EventHandlerResults,
    Action,
    StrategyEvent
} from '../../../src'

export interface SimpleStrategyState extends StrategyState {
    mode: LongShortMode
    product: any
    position: any
    realizedPnl: number
    buffer: DataBuffer<BarsTransformer>
}

export type CustomActions = AdjustStopLossAction | SetCancelAction

type AdjustStopLossAction = {
    event: 'adjustStopLoss'
    payload: {price: number}
}

type SetCancelAction = {
    event: 'setcancel'
    payload: {}
}

export default class TrendStrategy {
    private strategy
    private contract
    private replayMode

    constructor(params: StrategyParams) {
        this.strategy = new Strategy(params, this.init(), this.next)

        this.contract = params.contract
        this.replayMode = params.replayMode
    }

    disconnect() {
        return this.strategy.disconnect()
    }

    private init(): SimpleStrategyState {
        return {
            mode: LongShortMode.Watch,
            product: '',
            position: '',
            realizedPnl: 0,
            buffer: new DataBuffer(barsTransformer)
        }
    }

    private next(
        prevState: SimpleStrategyState,
        action: Action | CustomActions
    ): EventHandlerResults<SimpleStrategyState> {
        const {event, payload} = action

        switch (event) {
            case StrategyEvent.Chart: {
                return onChart(
                    prevState,
                    payload as BarPacket,
                    this.strategy.getRequestSocket(),
                    this.contract
                )
            }

            case StrategyEvent.Props: {
                return onProps(
                    prevState,
                    payload,
                    this.contract,
                    this.replayMode,
                    this.strategy.getRequestSocket()
                )
            }

            case StrategyEvent.UserSync: {
                return onUserSync(prevState, payload, this.contract)
            }

            case 'adjustStopLoss': {
                return onAdjustStopLoss(
                    prevState,
                    payload,
                    this.strategy.getRequestSocket()
                )
            }

            default: {
                if (isRequestAction(event)) return {state: prevState, actions: []} // make request

                return this.strategy.catchReplaySessionsDefault(prevState, action)
            }
        }
    }
}
