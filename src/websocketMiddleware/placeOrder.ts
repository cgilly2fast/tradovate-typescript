import {stringify} from 'querystring'
import {getCurrentAccount} from '../utils/storage'
import {Action, Dictionary, PlaceOrderRequestBody, TvSocket} from '../utils/types'

export const placeOrder = (
    state: Dictionary,
    action: Action,
    socket: TvSocket
): Action => {
    const {event, payload} = action

    if (event === 'order/placeOrder') {
        const {contract, orderType, action, orderQty, price} = payload

        const {id, name} = getCurrentAccount()

        const body = {
            symbol: contract.name,
            orderQty,
            accountSpec: name,
            accountId: id,
            action,
            price,
            orderType,
            isAutomated: true
        }
        sendPlaceOrder(socket, body)
    }

    return action
}

async function sendPlaceOrder(socket: TvSocket, body: PlaceOrderRequestBody) {
    try {
        const response = await socket.request({
            url: 'order/placeOrder',
            body
        })
        console.log(`[DevX Trade]: Placed order successfully ${response.d}`)
    } catch (err) {
        console.log(`[DevX Trade]: Order failed ${err} body: ${stringify(body)}`)
    }
}
