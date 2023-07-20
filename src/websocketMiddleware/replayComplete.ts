import { getReplaySocket } from "../utils/socketUtils"
import { Action } from "../utils/types"

export const replayComplete = (state:{[k:string]:any}, action:Action) => {
    const {event, payload} = action
    
    if(event === 'replay/replayComplete') {
        console.log('[IN REPLAY COMPLETE]')
        const { props } = payload
        const { dispatcher } = props
        const { position } = state

        const socket = getReplaySocket()
        
        let results:any = {
            finalPos: position?.netPos || 0,
            bought: position?.bought || 0,
            sold: position?.sold || 0,
    
        }
        
        let disposeFillReq = socket.request({
            url: 'fillPair/list',
            onResponse: (id:any, item:any) => {
                if(id === item.i) {

                    results.fillPairs = item.d
                    console.log('[DISPATCHING SHOW STATS]')
                    dispatcher.dispatch('replay/showStats', { data: results, props })
                    //disposeFillReq()                    
                }
            }
        })
    }    

    return action
}