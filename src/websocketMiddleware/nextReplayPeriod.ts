import {calculatePnL} from '../utils/pnl';
import { getReplaySocket, getSessionResults } from "../utils/socketUtils"
import { URLs } from "../config/tvCredentials";
import { getAccessToken } from '../utils/storage'
import {Action} from "../utils/types"
const { MD_URL } = URLs

export const nextReplayPeriod = (state:{[k:string]:any}, action:Action): Action => {
    const {event, payload} = action
    

    if(event === 'replay/nextneplayperiod') {
        console.log('[GOT TO NEXT REPLAY]')
        const { data, props } = payload
        const { current_period, position, realizedPnL, buffer, product } = state
        const { dispatcher, replay_periods } = props

        let modified_period = current_period - 1
        if(modified_period - 1 < replay_periods.length){
            const sessionResults = getSessionResults()
            //set results of this session
            sessionResults[`${replay_periods[modified_period].start} to ${replay_periods[modified_period].stop}`] = {
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
            console.log("[DevX Trader]: replay/nextreplayperiod:" + sessionResults)
        }

        if(current_period === replay_periods.length) {
            console.log("[DevX Trader]: [DISPATCHED REPLAY COMPLETE]")
            dispatcher.dispatch('replay/replayComplete', payload)
            return action
        } else {
            console.log("[DevX Trader]: [TRIED RESET REPLAY]")

            const socket = getReplaySocket()

            let originalSocket = socket.getSocket()

            socket.connect(MD_URL).then(() => { 
                originalSocket.removeAllListeners('message')
                originalSocket.close(1000, `Client initiated disconnect.`)

                let disposerA:any, disposerB:any, disposerC :any
                disposerA = socket.checkReplaySession({ // callback hell, find a fix
                    startTimestamp: replay_periods[current_period].start,
                    
                    callback: (item:any) => {
                        console.log("[DevX Trader]: [MADE IT TO CHECK SESSION]")
                        if(item.checkStatus && item.checkStatus === 'OK') {
        
                            disposerB = socket.initializeClock({
                                startTimestamp: replay_periods[current_period].start,
                                callback: (item:any) => {

                                    if(item) return // integral call! we only want to run this code once 

                                    console.log( "[DevX Trader]: [MADE IT TO INIT CLOCK]")
                                    
    
                                    disposerC = socket.request({
                                        url: 'account/list',
                                        onResponse: (id, item) => {
                                            
                                            if(id === item.i) {
    
                                                console.log("[DevX Trader]: [MADE IT TO INNERMOST CB]")
    
                                                const accounts = item.d
                                                const account = accounts.find((acct:any) => acct.active)
                                                console.log("[DevX Trader]: " + account)
                                                
                                                process.env.ACCOUNT = JSON.stringify(account)
                                                process.env.ID = account.id,
                                                process.env.SPEC = account.name
                                                process.env.USER_ID = account.userId
                                                
                                                dispatcher.dispatch('replay/resetEventHandlers', payload)
        
                                                // disposerA()
                                                // disposerB()
                                                // disposerC()
                                                // console.log(socket.ws.listeners())
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    }
                }) 
            })
        }
        return action            
    }    
    return action
}