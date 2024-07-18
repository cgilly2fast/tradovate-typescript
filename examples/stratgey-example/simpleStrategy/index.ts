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
    StrategyEvent,
    BarPacket,
    isRequestAction
} from '../../../src'
import {onAdjustStopLoss} from './onAdjustStopLoss'
import {onUserSync} from './onUserSync'
import {onProps} from './onProps'
import {onChart} from './onChart'

export interface SimpleStrategyState extends StrategyState {
    mode: LongShortMode
    product: any
    position: any
    realizedPnl: number
    buffer: DataBuffer<BarsTransformer>
    bufferLength: number
    breakeven: number
    stopLoss: number
    curPos: number
    orderTracker: {maxId: number; entryId: number; stops: {[k: string]: number}}
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
            buffer: new DataBuffer(barsTransformer),
            bufferLength: 0,
            breakeven: 0,
            stopLoss: 0,
            curPos: 0,
            orderTracker: {maxId: 0, entryId: 0, stops: {}}
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
