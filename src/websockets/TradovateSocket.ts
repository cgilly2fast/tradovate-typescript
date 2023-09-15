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
        if (
            socket &&
            (socket.getListeningUrl() !== URLs.WS_LIVE_URL ||
                socket.getListeningUrl() !== URLs.WS_DEMO_URL)
        )
            throw new Error('RequestSocket passed with an invalid url.')
        const listeningURL = socket
            ? socket.getListeningUrl()
            : live
            ? URLs.WS_LIVE_URL
            : URLs.WS_DEMO_URL
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

        const accountRes = await this.socket.request({
            url: 'account/list'
        })

        const account = accountRes.d.find(account => account.active)
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

        await this.socket.request({
            url: 'user/syncrequest',
            body: {accounts: [account!.id!]}
        })

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
