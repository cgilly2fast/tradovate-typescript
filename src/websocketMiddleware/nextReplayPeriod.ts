import {calculatePnL} from '../utils/pnl';
import { getReplaySocket, getSessionResults } from "../utils/socketUtils"
import { URLs } from "../config/tvCredentials";
import { setAvailableAccounts } from '../utils/storage'
import {Action,Payload} from "../utils/types"
import Dispatcher from '../utils/dispatcher';
const { REPLAY_URL } = URLs

export const nextReplayPeriod = (state:{[k:string]:any}, action:Action): Action => {
    const {event, payload} = action
    const {props} = payload
    

    if(event === 'replay/nextReplayPeriod') {
        console.log('[DevX Trader}: Go to next replay')
        const { current_period, position, realizedPnL, buffer, product } = state
        const { dispatcher, replayPeriods } = props

        let modified_period = current_period - 1
        if(modified_period < replayPeriods.length){
            const sessionResults = getSessionResults()
            //set results of this session
            sessionResults[`${replayPeriods[modified_period].start} to ${replayPeriods[modified_period].stop}`] = {
                finalPos: position?.netPos || 0,
                bought: position?.bought || 0,
                sold: position?.sold || 0,
                realizedPnL: `$${realizedPnL}`,
                openPnL: `$${calculatePnL({
                    price: buffer.last().close,
                    product, 
                    position
                }).toFixed(2)}`
            }
            console.log("[DevX Trader]: Session Results:" + JSON.stringify(sessionResults, null, 2))
        }

        if(current_period === replayPeriods.length) {
            console.log("[DevX Trader]: Dispatched replay complete]")
            dispatcher.dispatch('replay/replayComplete', payload)
            return action
        } else {
            startNextReplayPeriod(props, replayPeriods, current_period, dispatcher, payload)
            return action            
        }
    }    
    return action
}

async function startNextReplayPeriod(props:any, replayPeriods:any[],  current_period:number, dispatcher:Dispatcher,payload:Payload) {
    console.log("[DevX Trader]: Moving to next replay period..")

    const replaySocket = getReplaySocket()

    let originalSocket = replaySocket.getSocket()
    try {
        await replaySocket.connect(REPLAY_URL)  
        
        try {
            originalSocket.removeAllListeners('message')
            originalSocket.close(1000, `Client initiated disconnect.`)
        } catch (e:any) {
            console.log("socket remove", e)
        }
        console.log( "[DevX Trader]: Checking new replay period...")
        const res1 = await replaySocket.checkReplaySession({ 
            startTimestamp: replayPeriods[current_period].start,
            callback: (item:any) => {
                if(!item.checkStatus && item.checkStatus !== 'OK') 
                    throw new Error('Could not initialize replay session. Check that your replay periods are within a valid time frame and that you have Market Replay access.')
            }
        }) 


        console.log( "[DevX Trader]: Valid replay period.")
        console.log( "[DevX Trader]: Initializing new replay clock...")
        await replaySocket.initializeClock({
            startTimestamp: replayPeriods[current_period].start,
            speed: props.replaySpeed,
            callback: (item:any) => {
                if(item && item.e === "clock" && item.d.length < 40) {
                    console.log("current speed", item)
                    replaySocket.request({
                        url:'replay/changespeed',
                        body:{"speed": props.replaySpeed ?? 400},
                        onResponse: (id, r) => {
                            if(id === r.i) {
                                if(r.s === 200) {
                                    console.log(`[DevX Trader]: Replay socket speed restored to ${props.replaySpeed}`)
                                } else {
                                    console.log('[DevX Trader]: Error Replay socket speed restoration ' +JSON.stringify(r, null, 2))
                                }
                            }
                        }
                    })
                }
                return
            }
        })
        console.log( "[DevX Trader]: Initializing clock complete.")
        await replaySocket.request({
            url: 'account/list',
            onResponse: (id, item) => {
                
                if(id === item.i) {
                    const accounts = item.d
                    const account = accounts.find((acct:any) => acct.active)
                    console.log("[DevX Trader]: account: " + JSON.stringify(account, null, 2))

                    setAvailableAccounts([account])

                    
                    dispatcher.dispatch('replay/resetEventHandlers', payload)
                }
            }
        })
        console.log("[DevX Trader]: Transition to next replay period complete.")
    } catch(err:any) {
        console.log(`[DevX Trader]: nextReplayPeriod Error: ${err}`)
    }

}