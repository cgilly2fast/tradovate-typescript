import { getReplaySocket, getSocket } from "../utils/socketUtils"
import {getCurrentAccount} from '../utils/storage'
import {Action} from "../utils/types"

export const placeOCO = (state:{[k:string]:any} , action:Action):Action => {
    const {event, payload} = action

    if(event === '/order/placeOCO') {
        const { data, props } = payload
        const { devMode } = props
        
        const {
            action,
            symbol,
            orderQty,
            orderType,
            price,
            other,
        } = data

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
            other
        }
        
        socket.request({
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