import { getReplaySocket, getSocket } from "../utils/socketUtils"
import {getAvailableAccounts} from '../utils/storage'
import { Action } from "../utils/types"

export const placeOrder = (state:{[k:string]:any}, action:Action):Action => {
    const {event, payload} = action

    if(event === '/order/placeOrder') {
        const { data, props } = payload
        const { dev_mode } = props
        const { contract, orderType, action, orderQty, price } = data

        const socket = dev_mode ? getReplaySocket() : getSocket()

        const { id, name } = getAvailableAccounts()[0]

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