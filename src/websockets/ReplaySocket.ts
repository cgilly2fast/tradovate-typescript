import {
    ResponseMsg,
    ServerEvent,
    EndpointURLs,
    RequestParams,
    URLs,
    TvSocket,
    MdSocket,
    TradovateSocketSynchronizeParams,
    ChartDescription,
    TimeRange,
    Listener,
    ClockEventMsg,
    isServerEvent,
    isClockEventMsg,
    MarketDataSocketSubscribeParams,
    SubscribeURLs
} from '../types'
import TradovateSocket from './TradovateSocket'
import MarketDataSocket from './MarketDataSocket'
import RequestSocket from './RequestSocket'
import {log} from 'console'

export default class ReplaySocket implements TvSocket, MdSocket {
    private marketDataSocket: MarketDataSocket
    private tradovateSocket: TradovateSocket
    private socket: RequestSocket

    constructor(socket?: RequestSocket) {
        this.socket = socket ?? new RequestSocket(URLs.REPLAY_URL)
        this.marketDataSocket = new MarketDataSocket(this.socket)
        this.tradovateSocket = new TradovateSocket(false, this.socket)
    }

    async connect() {
        log(
            `[Tradovate]: connecting MarketDataSocket to ${this.socket.getListeningUrl()}...`
        )
        return this.socket.connect()
    }

    isConnected() {
        return this.socket.isConnected()
    }

    removeListeners() {
        return this.socket.removeListeners()
    }

    async disconnect() {
        // log('[Tradovate]: Closing ReplaySocket connection...')
        await this.marketDataSocket.disposeSubscriptions()
        this.socket.disconnect()
        log('[Tradovate]: Replay removed.')
    }

    checkReplaySession(startTimestamp: string) {
        return this.socket.request({
            url: 'replay/checkreplaysession',
            body: {startTimestamp}
        })
    }

    async initializeClock(
        startTimestamp: string,
        speed?: number,
        initialBalance?: number,
        onSubscription?: (item: ClockEventMsg) => void
    ): Promise<() => void> {
        let removeListener: () => void

        await this.socket.request({
            url: 'replay/initializeclock',
            body: {
                startTimestamp,
                speed: speed ?? 400,
                initialBalance: initialBalance ?? 50000
            }
        })

        if (onSubscription) {
            removeListener = this.socket.addListener(
                (item: ServerEvent | ResponseMsg<any>) => {
                    if (isServerEvent(item) && isClockEventMsg(item)) {
                        onSubscription(item)
                    }
                }
            )
            return async () => {
                removeListener()
            }
        }
        return async () => {}
    }

    synchronize(params: TradovateSocketSynchronizeParams): Promise<() => void> {
        return this.tradovateSocket.synchronize(params)
    }

    subscribe<T extends SubscribeURLs>(
        params: MarketDataSocketSubscribeParams<T>
    ): Promise<() => Promise<void>> {
        return this.marketDataSocket.subscribe(params)
    }

    subscribeChart(
        symbol: string,
        chartDescription: ChartDescription,
        timeRange: TimeRange,
        onSubscription: (item: any) => void
    ): Promise<() => void> {
        return this.marketDataSocket.subscribeChart(
            symbol,
            chartDescription,
            timeRange,
            onSubscription
        )
    }

    subscribeHistogram(
        symbol: string,
        onSubscription: (item: any) => void
    ): Promise<() => void> {
        return this.marketDataSocket.subscribeHistogram(symbol, onSubscription)
    }

    subscribeDOM(
        symbol: string,
        onSubscription: (item: any) => void
    ): Promise<() => void> {
        return this.marketDataSocket.subscribeDOM(symbol, onSubscription)
    }

    subscribeQuote(
        symbol: string,
        onSubscription: (item: any) => void
    ): Promise<() => void> {
        return this.marketDataSocket.subscribeQuote(symbol, onSubscription)
    }

    request<T extends EndpointURLs>(params: RequestParams<T>): Promise<ResponseMsg<T>> {
        return this.socket.request(params)
    }

    addListener(listener: (item: any) => void): () => Listener[] {
        return this.socket.addListener(listener)
    }
}
