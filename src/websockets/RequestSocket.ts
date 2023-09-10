import WebSocket, {MessageEvent, Data} from 'ws'
import {log} from 'console'
import {stringify} from '../utils/stringify'
import {
    ResponseMsg,
    ErrorResponse,
    isErrorResponse,
    RequestParams,
    URLs,
    Socket,
    EndpointURLs,
    Listener
} from '../types'

export default class RequestSocket implements Socket {
    private counter: number
    private ws: WebSocket
    private listeningURL: string
    private curTime: Date
    private listeners: Listener[]

    constructor(url: URLs) {
        this.counter = 0
        this.ws = {} as WebSocket
        this.listeningURL = url
        this.curTime = new Date()
        this.listeners = []
    }

    private prepareMessage(raw: Data) {
        const T = raw.slice(0, 1)
        let data = []
        if ((raw as string).length > 1) {
            data = JSON.parse((raw as string).slice(1))
        }
        return {T, data}
    }

    private checkHeartbeats() {
        const now = new Date() //time at call of onmessage

        if (now.getTime() - this.curTime.getTime() >= 2500) {
            this.ws.send('[]') //send heartbeat
            this.setCurTime(new Date()) //set the new base time
        }

        this.setCurTime(this.curTime)
    }

    private setCurTime(t: Date) {
        this.curTime = t === this.curTime ? this.curTime : t
    }

    private getCurTime() {
        return this.curTime
    }

    private increment() {
        return this.counter++
    }

    private getToken() {
        if (this.listeningURL === URLs.DEMO_URL || this.listeningURL === URLs.LIVE_URL)
            return process.env.ACCESS_TOKEN!
        return process.env.MD_ACCESS_TOKEN!
    }

    private dataToListeners(data: any[]) {
        this.listeners.forEach(listener => data.forEach((item: any) => listener(item)))
    }

    private parseQueryParams(params: any): string {
        const queryParams = []
        for (const key in params) {
            if (key in params) {
                const value = encodeURIComponent(params[key])
                queryParams.push(`${key}=${value}`)
            }
        }
        return queryParams.join('&')
    }

    getListeningUrl() {
        return this.listeningURL
    }

    removeListeners() {
        this.ws.removeAllListeners('message')
        this.ws.close(1000, `Client initiated disconnect.`)
        this.listeners = []
    }

    disconnect() {
        log('[Tradovate]: Closing ' + this.listeningURL + ' connection...')
        this.removeListeners()
        this.ws = {} as WebSocket
        log('[Tradovate]: ' + this.listeningURL + ' removed.')
    }

    isConnected() {
        return (
            this.ws &&
            this.ws.readyState !== 0 &&
            this.ws.readyState !== 2 &&
            this.ws.readyState !== 3 &&
            this.ws.readyState !== undefined
        )
    }

    addListener(listener: (item: any) => void) {
        this.listeners.push(listener)
        return () => this.listeners.splice(this.listeners.indexOf(listener), 1)
    }

    connect(): Promise<void> {
        this.ws = new WebSocket(this.listeningURL)
        let heartbeatInterval: NodeJS.Timer
        const token = this.getToken()

        const sendHeartbeat = () => {
            if (!this.isConnected()) {
                clearInterval(heartbeatInterval)
                return
            }
            this.ws.send('[]')
        }

        return new Promise((res, rej) => {
            const onEvent = async (msg: MessageEvent) => {
                const {T, data} = this.prepareMessage(msg.data)
                if (T === 'a' && data && data.length > 0) {
                    this.checkHeartbeats()
                    this.dataToListeners(data)
                } else if (T === 'h') {
                    this.ws.send('[]')
                }
            }

            const onConnect = async (msg: MessageEvent) => {
                const {T} = this.prepareMessage(msg.data)
                if (T === 'o') {
                    await this.request({url: 'authorize', body: {token}})

                    log('[Tradovate]: connected.')

                    this.ws.removeEventListener('message', onConnect)
                    heartbeatInterval = setInterval(sendHeartbeat, 2500)
                }
            }
            try {
                this.ws.addEventListener('message', onEvent)
                this.ws.addEventListener('message', onConnect)
                res()
            } catch (err) {
                log(`[Tradovate]: RequestSocket: Could not add listeners ${err}`)
                rej(err)
            }
        })
    }

    request<T extends EndpointURLs>(params: RequestParams<T>): Promise<ResponseMsg<T>> {
        const {url, body, query} = params

        return new Promise((res, rej) => {
            if (url === undefined)
                rej('url undefined. Pass as request<T> or in param object.')
            if (!this.isConnected()) rej('[Tradovate]: Websocket not connect ')

            const id = this.increment()

            const onRequest = (msg: MessageEvent) => {
                const {data} = this.prepareMessage(msg.data)

                data.forEach((item: ResponseMsg<T> | ErrorResponse) => {
                    if (item.i !== id) return

                    this.ws.removeEventListener('message', onRequest)

                    if (isErrorResponse(item)) {
                        rej(`WS request: ${stringify({params, item})}`)
                        return
                    }
                    res(item)
                })
            }

            try {
                this.ws.addEventListener('message', onRequest)
                this.ws.send(
                    `${url}\n${id}\n${this.parseQueryParams(query) || ''}\n${stringify(
                        body
                    )}`
                )
            } catch (err) {
                log(`[Tradovate]: Socket request: ${stringify({url, query, body})}`)
                throw err
            }
        })
    }
}
