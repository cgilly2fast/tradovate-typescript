import {log} from 'console'
import {
    TradovateSocketSynchronizeParams,
    Socket,
    URLs,
    EndpointURLs,
    RequestParams,
    ResponseMsg,
    ServerEvent,
    isServerEvent,
    isPropsEvent,
    isUserSyncResponseMsg
} from '../types'
import RequestSocket from './RequestSocket'

export default class TradovateSocket implements Socket {
    private socket: RequestSocket

    constructor(live: boolean = false, socket?: RequestSocket) {
        const listeningURL = live ? URLs.WS_LIVE_URL : URLs.WS_DEMO_URL
        this.socket = socket ?? new RequestSocket(listeningURL)
    }

    async connect() {
        log(
            `[Tradovate]: connecting TradovateSocket to ${this.socket.getListeningUrl()}...`
        )
        await this.socket.connect()
    }

    disconnect() {
        // log('[Tradovate]: Closing TradovateSocket connection...')
        this.socket.disconnect()
        log('[Tradovate]: TradovateSocket removed.')
    }

    isConnected() {
        return this.socket.isConnected()
    }

    async synchronize(params: TradovateSocketSynchronizeParams): Promise<() => void> {
        const {onSubscription} = params
        const {WS_DEMO_URL, WS_LIVE_URL} = URLs
        const listeningURL = this.socket.getListeningUrl()

        const accountRes = await this.socket.request({
            url: 'account/list'
        })

        const account = accountRes.d.find(account => account.active)

        await this.socket.request({
            url: 'user/syncrequest',
            body: {accounts: [account!.id!]}
        })

        if (listeningURL !== WS_DEMO_URL && listeningURL !== WS_LIVE_URL) {
            throw new Error(
                'Cannot subscribe to User Data without using Demo or Live URLs.'
            )
        }

        const removeListener = this.socket.addListener(
            (data: ResponseMsg<any> | ServerEvent) => {
                if (
                    isUserSyncResponseMsg(data) ||
                    (isServerEvent(data) && isPropsEvent(data))
                ) {
                    onSubscription(data.d)
                }
            }
        )

        return async () => {
            removeListener()
        }
    }

    request<T extends EndpointURLs>(params: RequestParams<T>): Promise<ResponseMsg<T>> {
        return this.socket.request(params)
    }

    addListener(listeners: (item: any) => void) {
        return this.socket.addListener(listeners)
    }
}
