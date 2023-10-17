import {SimpleStrategyState} from './'
import {
    EventHandlerResults,
    OrderType,
    TvSocket
} from '../../../../tradovate-typescript/dist'

export function onAdjustStopLoss(
    prevState: SimpleStrategyState,
    payload: {price: number},
    socket: TvSocket
): EventHandlerResults<SimpleStrategyState> {
    const {orderTracker} = prevState
    const {price} = payload
    const stops = Object.values(orderTracker.stops)

    stops.forEach(async (stopId: any) => {
        const body = {
            orderId: stopId,
            orderQty: 1,
            orderType: OrderType.Stop,
            stopPrice: price,
            isAutomated: true
        }
        try {
            const response = await socket.request({
                url: 'order/modifyorder',
                body
            })

            if (response.d.failureReason !== undefined) {
                console.log(
                    `Failure Stop adjustment, attempted: ${price} reason:${response.d.failureReason} commandId:${response.d.commandId}`
                )
            }

            const commandReport = await socket.request({
                url: 'commandReport/deps',
                query: {masterid: response.d.commandId!}
            })

            const lastReport = commandReport.d[commandReport.d.length - 1]
            if (lastReport.rejectReason) {
                console.log(
                    `Reject reason: ${lastReport.rejectReason} Command Status:${lastReport.commandStatus}`
                )
                return
            }

            console.log(`Stop adjusted to ${price} commandId: ${response.d.commandId}`)
        } catch (err) {
            throw new Error(
                `onChart: adjustStoploss: modifyorder: Error: ${err} Body: ${body}`
            )
        }
    })

    return {state: prevState, actions: []}
}
