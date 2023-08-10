import { getReplaySocket, getSocket } from "../utils/socketUtils"
import {getAvailableAccounts} from '../utils/storage'
import { Action } from "../utils/types"

export const startOrderStrategy = (state:{[k:string]:any}, action:Action) => {

    const {event, payload} = action
    
    if(event === 'orderStrategy/startOrderStrategy') {
        
        const { data, props } = payload
        const { dev_mode } = props
        const { contract, action, brackets, entryVersion } = data
        
        const socket = dev_mode ? getReplaySocket() : getSocket()

        const orderData = {
            entryVersion,
            brackets
        }

        //console.log("[DevX Trader]: " +JSON.stringify(orderData, null, 2))

        const { id, name } = getAvailableAccounts()[0]
        
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
                    console.log(r.d)
                    // if(r.s === 200) {
                    //     console.log(`[DevX Trader]: New Order Strategy: Status: ${r.s} Action: ${r.d.orderStrategy.action} Id: ${r.d.orderStrategy.id}` )
                    // } else {
                    //     console.log("[DevX Trader]: Error Order Strategy: "+JSON.stringify(r, null, 2))
                    // }
                }
            }
        })
    }

    return action
}