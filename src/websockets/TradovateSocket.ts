import { URLs } from "../config/tvCredentials";
import { getCurrentAccount } from '../utils/storage'
import { renewAccessToken } from "../endpoints/renewAccessToken";
import WebSocket from 'ws';

const { MD_URL, WS_DEMO_URL, WS_LIVE_URL } = URLs

export interface TradovateSocketSubscribeParams extends TradovateSocketRequestParams{
    disposer: Function
}

export interface  TradovateSocketRequestParams{
    url:string,
    query?: string,
    body?: { [k:string]: any }
    onResponse?:(id: number, item: any) => void, 
    onReject?: Function
}

export interface TradovateSocketConnectParams {
    url: string
    token: string
}

export default class TradovateSocket {
    public counter:number 
    public ws: WebSocket 
    public listeningURL: string
    public debugLabel: string
    private curTime: Date
   // public listeners: any[]
    

    constructor(debugLabel = "tvSocket") {
        this.counter = 0 
        this.ws = {} as WebSocket
        this.listeningURL = ""
        this.debugLabel = debugLabel
        this.curTime = new Date()
        
    }

    increment() {
        this.counter += 1
        return this.counter
    }

    

    disconnect() {
        console.log('[DevX Trader]: Closing '+this.constructor.name+' connection...')
        this.ws.removeAllListeners('message')
        this.ws.close(1000, `Client initiated disconnect.`)
        this.ws = {} as WebSocket
        console.log('[DevX Trader]: '+this.constructor.name+ ' removed.')
    
    }

    isConnected() {
        return this.ws && this.ws.readyState != 2 && this.ws.readyState != 3
    }

    getSocket() {
        return this.ws
    }

    request(params: TradovateSocketRequestParams):Promise<{e?: string, d?: any, i: number, s: number}>;
    request(params: TradovateSocketSubscribeParams):Promise<()=> Promise<void>>;
    request(params: TradovateSocketSubscribeParams) {
        const {url, query, body, onResponse, onReject, disposer} = params
        const self =this

        return new Promise((res, rej) => {
            const id = this.increment()
            try {
            this.ws.addEventListener('message', function onEvent(msg: any) {
                self.checkHeartbeats()
                const [T, data] = self.prepareMessage(msg.data)
    
                if(T !== 'a') { return }    
    
                data.forEach((item:any) => {
                    
                    if(item.s === 200 && item.i === id) {  //if first call of md socket or a request that has only one response
                       
                        if(onResponse) {
                            onResponse(id, item)
                        }
                        if(self.isSocketSubscribe(url)) {
                            res(async () => {
                                if(disposer && typeof disposer === 'function'){
                                    await disposer()
                                }
                                //self.ws.removeEventListener('message', onEvent)
                                
                            })
                        } else {
                            self.ws.removeEventListener('message', onEvent)
                            res(item)
                        }
                        
                    } else if(item.e && onResponse) { // for all messages for md socket after first responses
                        onResponse(id, item)
                    
                    } else if(item.s && item.s !== 200 && item.i && item.i === id) { // if error
                    
                        self.ws.removeEventListener('message', onEvent)
                        if(onReject) onReject()
                        rej(`[DevX Trader]:\nFAILED:\n\toperation '${url}'\n\tquery ${query ? JSON.stringify(query, null, 2) : ''}\n\tbody ${body ? JSON.stringify(body, null, 2) : ''}\n\treason '${JSON.stringify(item?.d, null, 2) || 'unknown'}'\n\titem '${item ? JSON.stringify(item):''}'`)
                    } 
                })  
            })
        } catch (err) {
            console.log(`[DevX Trader]: WS request parmas: ${JSON.stringify(params, null, 2)}`)
            throw err
        }
            
            this.ws.send(`${url}\n${id}\n${query || ''}\n${JSON.stringify(body)}`)
        })

    }

    private isSocketSubscribe(url:string):boolean {
        const subscribeRoutes = ['md/getChart' , 'md/subscribeDOM' , 'md/subscribeQuote' , 'md/subscribeHistogram' , 'user/syncrequest', 'replay/initializeclock']
        return subscribeRoutes.includes(url)
    }

    private prepareMessage(raw:any) {
        const T = raw.slice(0, 1)
        const data = raw.length > 1 ? JSON.parse(raw.slice(1)) : []
    
        return [T, data]
    }

    private checkHeartbeats() {
        const now = new Date()  //time at call of onmessage
    
        if(now.getTime() - this.curTime.getTime() >= 2500) {
            this.ws.send('[]')   //send heartbeat
            this.setCurTime(new Date())  //set the new base time
        }
        
        this.setCurTime(this.curTime)
    }
    
    private getCurTime() { return this.curTime }
    private setCurTime(t:any) { this.curTime = t === this.curTime ? this.curTime : t }

    connect(url: string):Promise<any> {
        
        console.log(`[DevX Trader]: connecting ${this.constructor.name} to ${url}...`)
        this.ws = new WebSocket(url)  
        this.listeningURL = url
        let heartbeatInterval:NodeJS.Timer
        const self =this

        return new Promise((res, rej) => {
            this.ws.addEventListener('message', async (msg:any) => {
                 
                const [T, data] = self.prepareMessage(msg.data)
                
                switch(T) {
                    case 'o':   
                        const token = this.constructor.name === 'TradovateSocket' ? process.env.ACCESS_TOKEN : process.env.MD_ACCESS_TOKEN
                        this.ws.send(`authorize\n0\n\n${token}`) 
                        console.log('[DevX Trader]: '+this.constructor.name+ ' connected.')
                           
                        heartbeatInterval = setInterval(() => {
                            if(this.ws.readyState == 0 || this.ws.readyState == 3 || this.ws.readyState == 2 || this.ws.readyState === undefined) {
                                clearInterval(heartbeatInterval)
                                return
                            }
                            this.ws.send('[]')
                        }, 2500)
                        
                        break
                    case 'h':
                        this.ws.send('[]')
                        break
                    case 'a':
                        const [first] = data
                        if(first.i === 0 && first.s === 200) {
                            res("")
                        } else rej()
                        break
                    case 'c':
                        console.log('[DevX Trader]: '+this.constructor.name+ ' connected.')
                        console.log(msg)
                        clearInterval(heartbeatInterval)
                        break
                    default:
                        console.error('[DevX Trader]: Unexpected response token received:')
                        console.error(msg)
                        break
                }
            })
        })
    }

    synchronize(callback: (data:any) => any) {
        if(!this.ws || this.ws.readyState == 3 || this.ws.readyState == 2) {
            console.warn('[DevX Trader]: no websocket connection available, please connect the websocket and try again.')
            return
        }
        return this.request({
            url: 'user/syncrequest',
            body: { accounts: [getCurrentAccount().id ]},
            onResponse: (id, data) => { 
                if(data.i === id
                || (data.e && data.e === 'props')
                || (data.e && data.e === 'clock')) {
                    callback(data.d)
                }
            }
        })
    }
}


