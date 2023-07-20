import { getReplaySocket, getSocket } from "../utils/socketUtils"
import {getAvailableAccounts} from '../utils/storage'
import { Action } from "../utils/types"

export const productFind = (state:{[k:string]:any}, action:Action): Action => {
    const { event, payload} = action

    if(event === 'product/find') {
        const { data, props } = payload
        const { dev_mode, dispatcher } = props
        const { name } = data

        const socket = dev_mode ? getReplaySocket() : getSocket()

        let dispose = socket.request({
            url: 'product/find',
            query: `name=${name}`,
            onResponse: (id, r) => {
                if(r.i === id) { 
                    console.log("[DevX Trader]: " + r)
                    dispatcher.dispatch('product/found', { data: { entity: r.d }, props })
                    //dispose()
                }
            }
        })
    }    

    return action
}