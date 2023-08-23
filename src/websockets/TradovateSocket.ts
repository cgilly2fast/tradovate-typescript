import { getCurrentAccount } from '../utils/storage'
import WebSocket from 'ws'
import { Item, Dictionary } from '../utils/types'

export interface TradovateSocketSubscribeParams
    extends TradovateSocketRequestParams {
    disposer: () => void
}

export interface TradovateSocketRequestParams {
    url: string
    query?: string
    body?: Dictionary
    onResponse?: (id: number, item: Item) => void
    onReject?: () => void
}

export interface TradovateSocketConnectParams {
    url: string
    token: string
}

export default class TradovateSocket {
    public counter: number
    public ws: WebSocket
    public listeningURL: string
    public debugLabel: string
    private curTime: Date

    constructor(debugLabel = 'tvSocket') {
        this.counter = 0
        this.ws = {} as WebSocket
        this.listeningURL = ''
        this.debugLabel = debugLabel
        this.curTime = new Date()
    }

    increment() {
        this.counter += 1
        return this.counter
    }

    disconnect() {
        console.log(
            '[DevX Trader]: Closing ' +
                this.constructor.name +
                ' connection...',
        )
        this.ws.removeAllListeners('message')
        this.ws.close(1000, `Client initiated disconnect.`)
        this.ws = {} as WebSocket
        console.log('[DevX Trader]: ' + this.constructor.name + ' removed.')
    }

    isConnected() {
        return this.ws && this.ws.readyState != 2 && this.ws.readyState != 3
    }

    getSocket() {
        return this.ws
    }

    request(params: TradovateSocketRequestParams): Promise<Item>
    request(
        params: TradovateSocketSubscribeParams,
    ): Promise<() => Promise<void>>
    request(params: TradovateSocketSubscribeParams) {
        const { url, query, body, onResponse, onReject, disposer } = params

        return new Promise((res, rej) => {
            const id = this.increment()
            try {
                if (url === 'replay/checkreplaysession') {
                    console.log(
                        "'replay/checkreplaysession' in request",
                        params,
                    )
                }
                const onEvent = (msg: any) => {
                    console.log(msg)
                    this.checkHeartbeats()
                    const [T, data] = this.prepareMessage(msg.data)

                    if (T !== 'a') {
                        return
                    }

                    data.forEach((item: Item) => {
                        if (item.s === 200 && item.i === id) {
                            //if first call of md socket or a request that has only one response

                            if (onResponse) {
                                onResponse(id, item)
                            }
                            if (this.isSocketSubscribe(url)) {
                                res(async () => {
                                    if (
                                        disposer &&
                                        typeof disposer === 'function'
                                    ) {
                                        await disposer()
                                    }
                                })
                            } else {
                                this.ws.removeEventListener('message', onEvent)
                                res(item)
                            }
                        } else if (item.e && onResponse) {
                            // for all messages for md socket after first responses
                            onResponse(id, item)
                        } else if (
                            item.s &&
                            item.s !== 200 &&
                            item.i &&
                            item.i === id
                        ) {
                            this.ws.removeEventListener('message', onEvent)
                            if (onReject) onReject()
                            rej(
                                `[DevX Trader]:\nFAILED:\n\toperation '${url}'\n\tquery ${
                                    query ? JSON.stringify(query, null, 2) : ''
                                }\n\tbody ${
                                    body ? JSON.stringify(body, null, 2) : ''
                                }\n\treason '${
                                    JSON.stringify(item?.d, null, 2) ||
                                    'unknown'
                                }'\n\titem '${
                                    item ? JSON.stringify(item) : ''
                                }'`,
                            )
                        }
                    })
                }
                this.ws.addEventListener('message', onEvent)
                this.ws.send(
                    `${url}\n${id}\n${query || ''}\n${JSON.stringify(body)}`,
                )
            } catch (err) {
                console.log(
                    `[DevX Trader]: WS request params: ${JSON.stringify(
                        params,
                        null,
                        2,
                    )}`,
                )
                throw err
            }
        })
    }

    private isSocketSubscribe(url: string): boolean {
        const subscribeRoutes = [
            'md/getChart',
            'md/subscribeDOM',
            'md/subscribeQuote',
            'md/subscribeHistogram',
            'user/syncrequest',
            'replay/initializeclock',
        ]
        return subscribeRoutes.includes(url)
    }

    private prepareMessage(raw: string) {
        const T = raw.slice(0, 1)
        const data = raw.length > 1 ? JSON.parse(raw.slice(1)) : []
        console.log(typeof data)
        return [T, data]
    }

    private checkHeartbeats() {
        const now = new Date() //time at call of onmessage

        if (now.getTime() - this.curTime.getTime() >= 2500) {
            this.ws.send('[]') //send heartbeat
            this.setCurTime(new Date()) //set the new base time
        }

        this.setCurTime(this.curTime)
    }

    private getCurTime() {
        return this.curTime
    }
    private setCurTime(t: Date) {
        this.curTime = t === this.curTime ? this.curTime : t
    }

    connect(url: string): Promise<void> {
        console.log(
            `[DevX Trader]: connecting ${this.constructor.name} to ${url}...`,
        )
        this.ws = new WebSocket(url)
        this.listeningURL = url
        let heartbeatInterval: NodeJS.Timer
        const token =
            this.constructor.name === 'TradovateSocket'
                ? process.env.ACCESS_TOKEN!
                : process.env.MD_ACCESS_TOKEN!
        const sendHeartbeat = () => {
            if (
                this.ws.readyState == 0 ||
                this.ws.readyState == 3 ||
                this.ws.readyState == 2 ||
                this.ws.readyState === undefined
            ) {
                clearInterval(heartbeatInterval)
                return
            }
            this.ws.send('[]')
        }

        return new Promise((res, rej) => {
            const onEvent = async (msg: any) => {
                const [T, data] = this.prepareMessage(msg.data)

                switch (T) {
                    case 'o':
                        this.ws.send(`authorize\n0\n\n${token}`)
                        console.log(
                            '[DevX Trader]: ' +
                                this.constructor.name +
                                ' connected.',
                        )

                        heartbeatInterval = setInterval(sendHeartbeat, 2500)
                        break
                    case 'h':
                        this.ws.send('[]')
                        break
                    case 'a':
                        if (data[0].i === 0 && data[0].s === 200) {
                            res()
                        } else rej()
                        break
                    case 'c':
                        console.log(
                            '[DevX Trader]: ' +
                                this.constructor.name +
                                ' connected.',
                        )
                        console.log(msg)
                        clearInterval(heartbeatInterval)
                        break
                    default:
                        console.error(
                            '[DevX Trader]: Unexpected response token received:',
                        )
                        console.error(msg)
                        break
                }
            }
            this.ws.addEventListener('message', onEvent)
        })
    }

    synchronize(callback: (data: any) => any) {
        if (!this.ws || this.ws.readyState == 3 || this.ws.readyState == 2) {
            console.warn(
                '[DevX Trader]: no websocket connection available, please connect the websocket and try again.',
            )
            return
        }
        return this.request({
            url: 'user/syncrequest',
            body: { accounts: [getCurrentAccount().id] },
            onResponse: (id, data) => {
                if (
                    data.i === id ||
                    (data.e && data.e === 'props') ||
                    (data.e && data.e === 'clock')
                ) {
                    callback(data.d)
                }
            },
        })
    }
}
