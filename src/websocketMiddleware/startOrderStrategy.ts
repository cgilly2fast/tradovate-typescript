import {getCurrentAccount} from '../utils/storage'
import {stringify} from '../utils/stringify'
import {Action, Dictionary, StartOrderStrategyRequestBody, TvSocket} from '../utils/types'

export const startOrderStrategy = (
    state: Dictionary,
    action: Action,
    socket: TvSocket
): Action => {
    const {event, payload} = action

    if (event === 'orderStrategy/startOrderStrategy') {
        const {contract, action, brackets, entryVersion} = payload

        const orderData = {
            entryVersion,
            brackets
        }

        const {id, name} = getCurrentAccount()

        const body: StartOrderStrategyRequestBody = {
            accountId: id,
            accountSpec: name,
            symbol: contract.name,
            action,
            orderStrategyTypeId: 2,
            params: JSON.stringify(orderData)
        }

        sendStartOrderStrategy(socket, body)
    }

    return action
}

async function sendStartOrderStrategy(
    socket: TvSocket,
    body: StartOrderStrategyRequestBody
) {
    try {
        const response = await socket.request({
            url: 'orderStrategy/startOrderStrategy',
            body
        })
        console.log(
            `[DevX Trader]: New Order Strategy: Status: ${response.s} Action: ${response.d.orderStrategy.action} Id: ${response.d.orderStrategy.id}`
        )
    } catch (err) {
        console.log(
            `[DevX Trader]: New Order Strategy Error: ${err} Body params: ${stringify(
                body
            )}`
        )
    }
}
