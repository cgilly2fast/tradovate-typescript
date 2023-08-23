import { getReplaySocket, getSocket } from "../utils/socketUtils"
import {getCurrentAccount} from '../utils/storage'
import { Action } from "../utils/types"

export const startOrderStrategy = (state:{[k:string]:any}, action:Action): Action => {

    const {event, payload} = action
    
    if(event === 'orderStrategy/startOrderStrategy') {
        
        const { data, props } = payload
        const { devMode } = props
        const { contract, action, brackets, entryVersion } = data
        const socket = devMode ? getReplaySocket() : getSocket()

        const orderData = {
            entryVersion,
            brackets
        }

        const { id, name } = getCurrentAccount()
        
        const body = {
            accountId: id,
            accountSpec: name,
            symbol: contract.name,
            action,
            orderStrategyTypeId: 2,
            params: JSON.stringify(orderData)
        }

        socket.request({
            url: 'orderStrategy/startOrderStrategy',
            body,
            onResponse: (id, r) => {
                 
                if(id === r.i) {
                    if(r.d.orderStrategy) {
                        console.log(`[DevX Trader]: New Order Strategy: Status: ${r.s} Action: ${r.d.orderStrategy.action} Id: ${r.d.orderStrategy.id}` )
                    } else {
                        console.log("[DevX Trader]: Error Order Strategy: "+JSON.stringify(r, null, 2))
                    }
                }
            }
        })
    }

    return action
}