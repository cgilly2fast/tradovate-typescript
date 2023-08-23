import { getReplaySocket, getSocket } from '../utils/socketUtils'
import { getCurrentAccount } from '../utils/storage'
import { Action, Dictionary } from '../utils/types'

export const placeOrder = (state: Dictionary, action: Action): Action => {
    const { event, payload } = action

    if (event === '/order/placeOrder') {
        const { data, props } = payload
        const { devMode } = props
        const { contract, orderType, action, orderQty, price } = data

        const socket = devMode ? getReplaySocket() : getSocket()

        const { id, name } = getCurrentAccount()

        const body = {
            symbol: contract.name,
            orderQty,
            accountSpec: name,
            accountId: id,
            action,
            price,
            orderType,
            isAutomated: true,
        }

        socket.request({
            url: 'order/placeOrder',
            body,
            onResponse: (id, item) => {
                if (id === item.i && item.s === 200) {
                    console.log(
                        `[DevX Trade]: Placed order successfully ${item.d}`,
                    )
                } else {
                    console.log(`[DevX Trade]: Order failed ${item.d}`)
                }
            },
        })
    }

    return action
}
