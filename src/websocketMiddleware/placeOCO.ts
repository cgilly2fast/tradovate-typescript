import {getReplaySocket, getSocket} from '../utils/socketUtils'
import {getCurrentAccount} from '../utils/storage'
import {stringify} from '../utils/stringify'
import {
    Action,
    Dictionary,
    PlaceOCOOrderEffectParams,
    PlaceOCORequestBody
} from '../utils/types'
import ReplaySocket from '../websockets/ReplaySocket'
import TradovateSocket from '../websockets/TradovateSocket'

export const placeOCO = (state: Dictionary, action: Action): Action => {
    const {event, payload} = action

    if (event === '/order/placeOCO') {
        const {data, props} = payload
        const {replayMode} = props

        const {action, contract, orderQty, orderType, price, other} =
            data as PlaceOCOOrderEffectParams

        const socket = replayMode ? getReplaySocket() : getSocket()

        const {id, name} = getCurrentAccount()

        const body: PlaceOCORequestBody = {
            accountSpec: name,
            accountId: id,
            action,
            symbol: contract.name,
            orderQty,
            orderType,
            price,
            isAutomated: true,
            other
        }

        sendPlaceOCO(socket, body)
    }

    return action
}

async function sendPlaceOCO(
    socket: TradovateSocket | ReplaySocket,
    body: PlaceOCORequestBody
) {
    try {
        const response = await socket.request({
            url: 'order/placeOCO',
            body
        })
        console.log(`[DevX Trade]: Placed OCO successfully ${response.d}`)
    } catch (err) {
        console.log(`[DevX Trade]: OCO Order failed ${err} body: ${stringify(body)}`)
    }
}
