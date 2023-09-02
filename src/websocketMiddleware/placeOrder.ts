import {stringify} from 'querystring'
import {getReplaySocket, getSocket} from '../utils/socketUtils'
import {getCurrentAccount} from '../utils/storage'
import {
    Action,
    Dictionary,
    PlaceOrderEffectParams,
    PlaceOrderRequestBody
} from '../utils/types'
import ReplaySocket from '../websockets/ReplaySocket'
import TradovateSocket from '../websockets/TradovateSocket'

export const placeOrder = (state: Dictionary, action: Action): Action => {
    const {event, payload} = action

    if (event === '/order/placeOrder') {
        const {data, props} = payload
        const {replayMode} = props
        const {contract, orderType, action, orderQty, price} =
            data as PlaceOrderEffectParams

        const socket = replayMode ? getReplaySocket() : getSocket()

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

async function sendPlaceOrder(
    socket: TradovateSocket | ReplaySocket,
    body: PlaceOrderRequestBody
) {
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
