import {getCurrentAccount} from '../utils/storage'
import {log} from 'console'
import {
    TradovateSocketSynchronizeParams,
    Socket,
    URLs,
    EndpointURLs,
    RequestParams,
    ResponseMsg 
} from '../utils/types'
import RequestSocket from './RequestSocket'



export default class TradovateSocket implements Socket {
    private socket: RequestSocket

    constructor(live: boolean = false, socket?: RequestSocket) {
        let listeningURL = live ? URLs.LIVE_URL : URLs.DEMO_URL
        this.socket = socket ?? new RequestSocket(listeningURL)
    }

   
    async connect() {
        log(`[DevX Trader]: connecting TradovateSocket to ${this.socket.getListeningUrl()}...`)
        await this.socket.connect()
        log(`[DevX Trader]: TradovateSocket connected`)
    }

    disconnect() {
        log('[DevX Trader]: Closing TradovateSocket connection...')
        this.socket.disconnect()
        log('[DevX Trader]: TradovateSocket removed.')
    }

    isConnected() {
        return this.socket.isConnected()
    }

    synchronize(params: TradovateSocketSynchronizeParams):Promise<()=> void> {
        const {onSubscription} = params
        const {WS_DEMO_URL, WS_LIVE_URL} = URLs
        const listeningURL = this.socket.getListeningUrl()

        let removeListener: () => void
        return new Promise(async (res, rej) => {
    
            await this.socket.request({
                url:'user/syncrequest',
                body:{accounts: [getCurrentAccount().id]}
            })
            if (listeningURL !== WS_DEMO_URL &&
                listeningURL !== WS_LIVE_URL) {
                rej('Cannot subscribe to User Data without using Demo or Live URLs.')
            }
            if (!this.socket.isConnected()) 
                rej('No websocket connection available, connect websocket and try again.')
            
            removeListener = this.socket.addListener((data: any) => {
                if (data?.d?.users || data?.e === 'props') {
                    onSubscription(data.d)
                }
            })

            res(async () => {
                removeListener()
            })
        })
    }
    
    request<T extends EndpointURLs>(params:RequestParams<T>): Promise<ResponseMsg<T>> {
        return this.socket.request(params)
    }

    addListener(listeners: (item:any)=>void) {
        return this.socket.addListener(listeners)
    }
}
