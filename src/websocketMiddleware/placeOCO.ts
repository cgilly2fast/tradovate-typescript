import { getReplaySocket, getSocket } from '../utils/socketUtils'
import { getCurrentAccount } from '../utils/storage'
import { Action, Dictionary } from '../utils/types'

export const placeOCO = (state: Dictionary, action: Action): Action => {
    const { event, payload } = action

    if (event === '/order/placeOCO') {
        const { data, props } = payload
        const { devMode } = props

        const { action, symbol, orderQty, orderType, price, other } = data

        const socket = devMode ? getReplaySocket() : getSocket()

        const { id, name } = getCurrentAccount()

        const body = {
            accountSpec: name,
            accountId: id,
            action,
            symbol,
            orderQty,
            orderType,
            price,
            isAutomated: true,
            other,
        }

        socket.request({
            url: 'order/placeOCO',
            body,
            onResponse: (id, item) => {
                if (id === item.i && item.s === 200) {
                    console.log(
                        `[DevX Trade]: Placed OCO successfully ${item.d}`,
                    )
                } else {
                    console.log(`[DevX Trade]: OCO Order failed ${item.d}`)
                }
            },
        })
    }

    return action
}
