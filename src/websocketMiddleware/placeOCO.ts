import { getReplaySocket, getSocket } from "../utils/socketUtils"
import {getAvailableAccounts} from '../utils/storage'
import {Action} from "../utils/types"

export const placeOCO = (state:{[k:string]:any} , action:Action):Action => {
    const {event, payload} = action

    if(event === '/order/placeOCO') {
        const { data, props } = payload
        const { dev_mode } = props
        
        const {
            action,
            symbol,
            orderQty,
            orderType,
            price,
            other,
        } = data

        const socket = dev_mode ? getReplaySocket() : getSocket()
        
        const { id, name } = getAvailableAccounts()[0]

        const body = {
            accountSpec: name,
            accountId: id,
            action,
            symbol,
            orderQty,
            orderType,
            price,
            isAutomated: true, 
            other
        }
        
        let dispose = socket.request({
            url: 'order/placeOCO',
            body,
            onResponse: (id, r) => {
                console.log('Placed OCO successfully')
                // dispose()
            }
        })
    }
    

    return action
}