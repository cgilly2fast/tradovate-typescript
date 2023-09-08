import {getCurrentAccount} from '../utils/storage'
import {stringify} from '../utils/stringify'
import {Action, Dictionary, PlaceOCORequestBody, TvSocket} from '../utils/types'

export const placeOCO = (state: Dictionary, action: Action, socket: TvSocket): Action => {
    const {event, payload} = action

    if (event === 'order/placeOCO') {
        const {action, contract, orderQty, orderType, price, other} = payload

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

async function sendPlaceOCO(socket: TvSocket, body: PlaceOCORequestBody) {
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
