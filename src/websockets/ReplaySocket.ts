import { URLs } from '../config/tvCredentials'
import {
    ResponseMsg,
    ServerEvent,
    isResponseMsg,
    isServerEvent,
    EndpointResponseMap,
    ServerEventMessageMap,
} from '../utils/types'
import TradovateSocket from './TradovateSocket'
export type ReplaySocketCheckReplaySessionParams = {
    startTimestamp: string
    callback: (item: ResponseMsg<'replay/checkreplaysession'>) => void
}

export type ReplaySocketInitializeClockParams = {
    speed?: number
    initialBalance?: number
    startTimestamp: string
    onSubscription?: (item?: ResponseMsg<'replay/initializeclock'>) => void
}

export default class ReplaySocket {
    private tradovateSocket: TradovateSocket
    constructor() {
        this.tradovateSocket = new TradovateSocket()
    }

    async connect() {
        return this.tradovateSocket.connect(URLs.REPLAY_URL)
    }

    isConnected() {
        return this.tradovateSocket.isConnected()
    }

    checkReplaySession(
        params: ReplaySocketCheckReplaySessionParams,
    ) {
        const { startTimestamp, callback } = params
        return this.tradovateSocket.request({
            url: 'replay/checkreplaysession',
            body: { startTimestamp },
            onResponse: callback
        })
    }

    async initializeClock(
        params: ReplaySocketInitializeClockParams,
    ) {


        const { startTimestamp, speed, initialBalance, onSubscription } = params

        let removeListener: () => void
    
         await this.tradovateSocket.request(
            {  url: 'user/syncrequest',body:{
            startTimestamp,
            speed: speed ?? 400,
            initialBalance: initialBalance ?? 50000,
        }})
        return new Promise((res, rej) => {

           if(onSubscription) { 
            removeListener = this.tradovateSocket.addListener((data: any) => {
                if (data?.d?.users || data?.e === 'props') {
                  onSubscription(data.d)
                }
              })
           }
            res(async () => {
                removeListener()
            })
        })
    }
}
