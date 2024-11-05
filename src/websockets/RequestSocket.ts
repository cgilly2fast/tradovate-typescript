import WebSocket, {MessageEvent, Data} from 'ws'
import {log} from 'console'
import {stringify, stringifyQueryParams} from '../utils/stringify'
import {
    ResponseMsg,
    RequestParams,
    URLs,
    Socket,
    EndpointURLs,
    Listener,
    isSocketPenaltyResponse,
    isHTTPErrorResponse,
    isTradovateURL
} from '../types'
import Storage from '../storage'

/**
 * Represents a WebSocket-based communication class for making requests and handling responses.
 * This class is specifically designed for interacting with Tradovate API endpoints.
 */
export default class RequestSocket implements Socket {
    private counter: number
    private ws: WebSocket
    private listeningURL: URLs
    private curTime: Date
    private listeners: Listener[]
    private storage: Storage

    /**
     * Initializes a new instance of the RequestSocket class.
     * @param url - The URL to connect to. Must be a valid Tradovate URL.
     * @throws Error if the provided URL is not a valid Tradovate URL.
     */
    constructor(url: URLs) {
        if (!isTradovateURL(url)) throw new Error(`Not a valid Tradovate URL: ${url}`)
        this.counter = 0
        this.ws = {} as WebSocket
        this.listeningURL = url
        this.curTime = new Date()
        this.listeners = []
        this.storage = Storage.getInstance()
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

    private increment() {
        return this.counter++
    }

    private getToken() {
        if (this.listeningURL === URLs.DEMO_URL || this.listeningURL === URLs.LIVE_URL)
            return this.storage.getAccessToken().accessToken!
        return this.storage.getMdAccessToken().mdAccessToken!
    }

    private dataToListeners(data: any[]) {
        for (let i = 0; i < this.listeners.length; i++) {
            for (let j = 0; j < data.length; j++) {
                this.listeners[i](data[j])
            }
        }
    }

    /**
     * Connects to the WebSocket server.
     * @returns A promise that resolves when the connection is established successfully.
     */
    getListeningUrl() {
        return this.listeningURL
    }

    /**
     * Removes all listeners and closes the WebSocket connection.
     */
    removeListeners() {
        this.ws.removeAllListeners('message')
        this.ws.close(1000, `Client initiated disconnect.`)
        this.listeners = []
    }

    /**
     * Disconnects from the WebSocket server.
     * @remarks
     * This method closes the WebSocket connection and removes all listeners.
     */
    disconnect() {
        log('[Tradovate]: Closing ' + this.listeningURL + ' connection...')
        this.removeListeners()
        this.ws = {} as WebSocket
    }

    /**
     * Disconnects from the WebSocket server.
     * @remarks
     * This method closes the WebSocket connection and removes all listeners.
     */
    isConnected() {
        return (
            this.ws &&
            this.ws.readyState !== 0 &&
            this.ws.readyState !== 2 &&
            this.ws.readyState !== 3 &&
            this.ws.readyState !== undefined
        )
    }

    /**
     * Adds a listener function to handle incoming data from the WebSocket.
     * @param listener - The listener function that processes incoming data.
     * @returns A function to remove the listener when called.
     */
    addListener(listener: (item: any) => void) {
        this.listeners.push(listener)
        return () => this.listeners.splice(this.listeners.indexOf(listener), 1)
    }

    /**
     * Connects to the WebSocket server.
     * @param accessToken - Optional. Pass in access token d=instead of using default from storage singleton.
     * @returns A promise that resolves when the connection is established successfully.
     * @throws Error if there are issues with establishing the connection.
     * **Example:**
     * TradovateService connect method must be called before the calling the RequestSocket's
     * connect method.
     *
     * ```typescript
     * // Create a service object
     * const service = new TradovateService()
     *
     * // connect with Tradovate's API Service with credentials
     * await service.connect(credentials)
     *
     * // Pass in demo environment websocket url
     * const requestSocket = new RequestSocket(URLs.WS_DEMO_URL)
     *
     * // connect and authenticate websocket connection.
     * await requestSocket.connect()
     * ```
     */
    connect(accessToken?: string): Promise<void> {
        this.ws = new WebSocket(this.listeningURL)
        let heartbeatInterval: NodeJS.Timeout
        const token = accessToken ?? this.getToken()

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
                    const authorizeResponse = await this.request({
                        url: 'authorize',
                        body: token
                    })
                    this.increment()
                    if (authorizeResponse.s !== 200)
                        rej(
                            `${this.listeningURL} authorization failed with ${stringify(
                                authorizeResponse
                            )}`
                        )

                    log('[Tradovate]: ...connected.')

                    this.ws.removeEventListener('message', onConnect)
                    heartbeatInterval = setInterval(sendHeartbeat, 2500)
                    res()
                }
            }
            try {
                this.ws.addEventListener('message', onEvent)
                this.ws.addEventListener('message', onConnect)
            } catch (err) {
                log(`[Tradovate]: RequestSocket: Could not add listeners ${err}`)
                rej(err)
            }
        })
    }

    /**
     * Sends a request to the WebSocket server.
     * @param params - The request parameters, including the URL, request body, and query parameters.
     * @returns A promise that resolves with the response from the server.
     * @throws Error if the URL is undefined, or if the WebSocket is not connected.
     *
     * **Example:**
     * Ways to call for types of request. Typescript will throw errors if url is not valid tradovate
     * endpoint and will confirm structure of body or query fields.
     * ```typescript
     * //get Request with no query params
     * const response = await requestSocket.request({url: 'account/list'})
     *
     * //Get request with query params
     * const response = await requestSocket.request({url: 'contract/find', query: {name: ESU3}})
     *
     * //post request
     * const response = await requestSocket.request({url: 'authorize',body:token})
     * ```
     */
    request<T extends EndpointURLs>(params: RequestParams<T>): Promise<ResponseMsg<T>> {
        const {url, body, query} = params

        return new Promise((res, rej) => {
            if (url === undefined)
                rej('url undefined. Pass as request<T> or in param object.')
            if (!this.isConnected()) rej('[Tradovate]: Websocket not connect ')

            const id = this.increment()

            const onRequest = (msg: MessageEvent) => {
                const {data} = this.prepareMessage(msg.data)

                for (let i = 0; i < data.length; i++) {
                    if (data[i].i !== id) return

                    this.ws.removeEventListener('message', onRequest)

                    if (
                        isSocketPenaltyResponse(data[i]) ||
                        isHTTPErrorResponse(data[i])
                    ) {
                        rej(
                            `WS request: ${stringify({params, data: data[i]})}, ${
                                this.listeningURL
                            }`
                        )
                        return
                    }
                    res(data[i])
                }
            }

            try {
                this.ws.addEventListener('message', onRequest)
                this.ws.send(
                    `${url}\n${id}\n${stringifyQueryParams(query!)}\n${stringify(body)}`
                )
            } catch (err) {
                log(`[Tradovate]: Socket request: ${stringify({url, query, body})}`)
                rej(err)
            }
        })
    }
}
