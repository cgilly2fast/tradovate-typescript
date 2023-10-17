import {
    EntityType,
    LongShortMode,
    PropsPayload,
    Contract,
    TvSocket,
    EventHandlerResults,
    Action
} from '../../../../tradovate-typescript/dist'
import {SimpleStrategyState, CustomActions} from './'

export function onProps(
    prevState: SimpleStrategyState,
    payload: PropsPayload,
    contract: Contract,
    replayMode: boolean,
    socket: TvSocket
): EventHandlerResults<SimpleStrategyState> {
    const {entityType, entity} = payload
    const {breakeven, mode, curPos, orderTracker} = prevState
    let {stopLoss} = prevState
    let actions: (Action | CustomActions)[] = []

    if (entityType === EntityType.Position && entity.contractId === contract.id) {
        const {netPos, timestamp} = entity

        if (
            (curPos > 2 &&
                netPos === 2 &&
                mode === LongShortMode.Long &&
                stopLoss < breakeven) ||
            (curPos < -2 &&
                netPos === -2 &&
                mode === LongShortMode.Short &&
                stopLoss > breakeven)
        ) {
            stopLoss = breakeven
            actions.push({event: 'adjustStopLoss', payload: {price: stopLoss}})
        } else if (
            curPos === 2 &&
            netPos === 1 &&
            mode === LongShortMode.Long &&
            stopLoss < breakeven + 0.5
        ) {
            stopLoss = breakeven + 0.5
            actions.push({event: 'adjustStopLoss', payload: {price: stopLoss}})
        } else if (
            curPos === -2 &&
            netPos === -1 &&
            mode === LongShortMode.Short &&
            stopLoss > breakeven - 0.5
        ) {
            stopLoss = breakeven - 0.5
            actions.push({event: 'adjustStopLoss', payload: {price: stopLoss}})
        }

        return {
            state: {
                ...prevState,
                curPos: netPos,
                mode:
                    netPos > 0
                        ? LongShortMode.Long
                        : netPos < 0
                        ? LongShortMode.Short
                        : /*else*/ LongShortMode.Watch,
                breakeven: netPos === 0 ? 0 : breakeven,
                stopLoss: netPos === 0 ? 0 : stopLoss,
                position: entity
            },
            actions
        }
    }

    if (entityType === EntityType.CashBalance) {
        const {realizedPnl, timestamp} = entity

        return {
            state: {
                ...prevState,
                realizedPnl: realizedPnl ?? prevState.realizedPnl
            },
            actions: []
        }
    }

    if (entityType === EntityType.OrderVersion) {
        if (entity.stopPrice && stopLoss !== entity.stopPrice) {
            console.log(
                `[DevX Trader]: (OrderVersion) Stop loss state updated from: ${stopLoss} to: ${entity.stopPrice}`
            )
            stopLoss = entity.stopPrice
        }
        if (
            entity.orderType === 'Stop' &&
            orderTracker.maxId < entity.orderId &&
            !Object.prototype.hasOwnProperty.call(orderTracker.stops, entity.orderId)
        ) {
            orderTracker.maxId = entity.orderId
            orderTracker.stops[entity.orderId] = entity.orderId
        }
        return {
            state: {
                ...prevState,
                stopLoss,
                orderTracker
            },

            actions: []
        }
    }

    if (entityType === EntityType.ExecutionReport) {
        if (
            (entity.ordStatus === 'Canceled' || entity.ordStatus === 'Filled') &&
            Object.prototype.hasOwnProperty.call(orderTracker.stops, entity.orderId)
        ) {
            delete orderTracker.stops[entity.orderId]
            return {state: {...prevState, orderTracker}, actions: []}
        }
        if (
            mode === LongShortMode.Entry &&
            entity.execType === 'New' &&
            entity.ordStatus === 'Working'
        ) {
            if (replayMode) {
                setTimeout(async () => {
                    const replaySocket = socket
                    try {
                        const item = await replaySocket.request({
                            url: 'order/cancelorder',
                            body: {orderId: entity.orderId}
                        })

                        const commandReports = await replaySocket.request({
                            url: 'commandReport/deps',
                            query: {masterid: item.d.commandId!}
                        })
                        if ((commandReports.d as any[]).length > 0) {
                            console.log(
                                `[DevX Trader]: Entry cancelled commandId: ${JSON.stringify(
                                    commandReports.d,
                                    null,
                                    2
                                )}`
                            )
                        } else {
                            console.log(`[DevX Trader]: Entry already executed`)
                        }
                    } catch (err) {
                        console.log(`[DevX Trader]: DevMode: cancel order Error${err}`)
                    }
                }, 3000)
            }
            orderTracker.entryId = entity.orderId
            return {state: {...prevState, orderTracker}, actions: []}
        }
        if (
            mode === LongShortMode.Entry &&
            orderTracker.entryId === entity.orderId &&
            entity.execType === 'Canceled' &&
            entity.ordStatus === 'Canceled'
        ) {
            return {
                state: {...prevState, mode: LongShortMode.Setup},
                actions: []
            }
        }

        return {state: prevState, actions: []}
    }

    // if (entityType === EntityType.OrderStrategy) {

    //     return {state: prevState, actions: []}
    // }

    // if (entityType === EntityType.OrderStrategyLink) {
    //     try {
    //         db.collection('order_strategy_links')
    //             .doc(entity.id + '')
    //             .set({...entity, runId: runId})
    //     } catch (err) {
    //         console.log('OrderStrategyLink Entity:', entity)
    //         console.log('OrderStrategyLink documentation err:', err)
    //     }
    //     return {state: prevState, actions: []}
    // }

    if (entityType === EntityType.Fill) {
        console.log(
            `[DevX Trader]: Fill: ${entity.action} Qty: ${entity.qty} @ ${entity.price}`
        )

        if (entity.qty === 3) {
            return {
                state: {...prevState, breakeven: entity.price},
                actions: []
            }
        }
        return {state: prevState, actions: []}
    }

    return {state: prevState, actions: []}
}
