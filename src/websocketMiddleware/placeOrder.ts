import { getReplaySocket, getSocket } from "../utils/socketUtils"
import {getCurrentAccount} from '../utils/storage'
import { Action } from "../utils/types"

export const placeOrder = (state:{[k:string]:any}, action:Action):Action => {
    const {event, payload} = action

    if(event === '/order/placeOrder') {
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
            isAutomated: true

        }

        let dispose = socket.request({
            url: 'order/placeOrder',
            body,
            onResponse: (id, r) => {
                console.log('Placed order successfully')
                //dispose()
            }
        })
    }
    

    return action
}