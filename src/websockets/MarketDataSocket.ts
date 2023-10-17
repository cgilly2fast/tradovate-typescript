import {log} from 'console'
import {
    ChartDescription,
    ServerEvent,
    MdSocket,
    ResponseMsg,
    TimeRange,
    URLs,
    isServerEvent,
    isChartEventMsg,
    EndpointURLs,
    MarketDataSocketSubscribeParams,
    isGetChartResponse,
    CancelBody,
    CancelChartBody,
    SubscribeBodyParams,
    DOM,
    isDomEventMsg,
    isQuoteEventMsg,
    Quote,
    Histogram,
    isHistogramEventMsg,
    Chart,
    isChartSubscription,
    isDOMSubscription,
    isQuoteSubscription,
    isHistogramSubscription,
    isPenaltyResponse,
    PenaltyResponse,
    Contract,
    SubscribeURLs
} from '../types'
import RequestSocket from './RequestSocket'
import TradovateService from '../service'
import {stringify} from '../utils/stringify'
export default class MarketDataSocket implements MdSocket {
    private socket: RequestSocket
    private service: TradovateService
    private subscriptions: Array<{
        symbol: string | number
        dispose: () => Promise<void>
    }>
    private subscribeCancelMap: Record<string, EndpointURLs>

    constructor(socket?: RequestSocket) {
        this.socket = socket ?? new RequestSocket(URLs.MD_URL)
        this.service = new TradovateService()
        this.subscriptions = []
        this.subscribeCancelMap = {
            'md/subscribequote': 'md/unsubscribequote',
            'md/getchart': 'md/cancelchart',
            'md/subscribehistogram': 'md/unsubscribehistogram',
            'md/subscribedom': 'md/unsubscribedom'
        }
    }

    async connect() {
        log(
            `[Tradovate]: connecting MarketDataSocket to ${this.socket.getListeningUrl()}...`
        )
        return await this.socket.connect()
    }

    async disconnect(): Promise<void> {
        await this.disposeSubscriptions()
        this.socket.disconnect()
        log('[Tradovate]: MarketDataSocket removed.')
    }

    isSubscribeUrl(url: EndpointURLs): boolean {
        return this.subscribeCancelMap[url] !== undefined
    }

    isConnected() {
        return this.socket.isConnected()
    }
    unsubscribe(symbol: string) {
        for (let i = 0; i < this.subscriptions.length; i++) {
            if (this.subscriptions[i].symbol == symbol) {
                log(`Closing subscription to ${symbol}.`)
                this.subscriptions.splice(
                    this.subscriptions.indexOf(this.subscriptions[i]),
                    1
                )
                this.subscriptions[i].dispose()
            }
        }
    }

    async subscribe<T extends SubscribeURLs>(
        params: MarketDataSocketSubscribeParams<T>
    ): Promise<() => Promise<void>> {
        const {url, body, onSubscription} = params

        if (!this.isSubscribeUrl(url))
            throw new Error(`subscribe: ${url} is not a subscription url`)

        const {symbol} = body as SubscribeBodyParams

        let removeListener: () => void
        const cancelUrl = this.subscribeCancelMap[url]
        let cancelBody: CancelBody | CancelChartBody
        let contractId: number
        let realtimeId: number

        const response = await this.socket.request<T>({
            url,
            body
        })

        if (response.d && response.d.errorText)
            throw new Error(`subscribe: ${response.d.errorText}`)

        if (isGetChartResponse(response)) {
            realtimeId = response.d.realtimeId! || response.d.subscriptionId!
            cancelBody = {subscriptionId: realtimeId}
        } else {
            let contract: Contract | PenaltyResponse
            try {
                contract = await this.service.get('contract/find', {name: symbol})
            } catch (err) {
                throw new Error(
                    `Subscribe: ${url} Could not find contract id for symbol ${symbol}, ${err}`
                )
            }

            if (isPenaltyResponse(contract))
                throw new Error(
                    `Subscribe: ${url} rate limit hit ${symbol}, ${stringify(contract)}`
                )
            contractId = contract.id!
            cancelBody = {symbol}
        }

        switch (url.toLowerCase()) {
            case 'md/getchart': {
                if (!isChartSubscription(onSubscription)) {
                    break
                }
                removeListener = this.socket.addListener(
                    (item: ResponseMsg<any> | ServerEvent) => {
                        if (!isServerEvent(item) || !isChartEventMsg(item.d)) {
                            return
                        }
                        for (let i = 0; i < item.d.charts.length; i++) {
                            item.d.charts[i].id === realtimeId
                                ? onSubscription(item.d.charts[i])
                                : null
                        }
                    }
                )
                break
            }
            case 'md/subscribedom': {
                if (!isDOMSubscription(onSubscription)) {
                    break
                }
                removeListener = this.socket.addListener(
                    (item: ResponseMsg<any> | ServerEvent) => {
                        if (!isServerEvent(item) || !isDomEventMsg(item.d)) {
                            return
                        }
                        for (let i = 0; i < item.d.doms.length; i++) {
                            item.d.doms[i].contractId === contractId
                                ? onSubscription(item.d.doms[i])
                                : null
                        }
                    }
                )
                break
            }
            case 'md/subscribequote': {
                if (!isQuoteSubscription(onSubscription)) {
                    break
                }
                removeListener = this.socket.addListener(
                    (item: ResponseMsg<any> | ServerEvent) => {
                        if (!isServerEvent(item) || !isQuoteEventMsg(item.d)) {
                            return
                        }
                        for (let i = 0; i < item.d.quotes.length; i++) {
                            item.d.quotes[i].contractId === contractId
                                ? onSubscription(item.d.quotes[i])
                                : null
                        }
                    }
                )
                break
            }
            case 'md/subscribehistogram': {
                if (!isHistogramSubscription(onSubscription)) {
                    break
                }
                removeListener = this.socket.addListener(
                    (item: ResponseMsg<any> | ServerEvent) => {
                        if (isServerEvent(item) && isHistogramEventMsg(item.d)) {
                            return
                        }
                        for (let i = 0; i < item.d.histogram.length; i++) {
                            item.d.histograms[i].contractId === contractId
                                ? onSubscription(item.d.histograms[i])
                                : null
                        }
                    }
                )
                break
            }
        }

        return async () => {
            removeListener()
            await this.socket.request({
                url: cancelUrl,
                body: cancelBody
            })
        }
    }

    disposeSubscriptions() {
        for (let i = 0; i < this.subscriptions.length; i++) {
            this.subscriptions[i].dispose()
        }
        this.subscriptions = []
    }

    async subscribeQuote(
        symbol: string,
        onSubscription: (item: Quote) => void
    ): Promise<() => void> {
        const dispose = await this.subscribe({
            url: 'md/subscribequote',
            body: {symbol},
            onSubscription
        })

        this.subscriptions.push({symbol, dispose})
        return dispose
    }

    async subscribeDOM(
        symbol: string,
        onSubscription: (item: DOM) => void
    ): Promise<() => void> {
        const dispose = await this.subscribe({
            url: 'md/subscribedom',
            body: {symbol},
            onSubscription
        })

        this.subscriptions.push({symbol, dispose})
        return dispose
    }

    async subscribeHistogram(
        symbol: string,
        onSubscription: (item: Histogram) => void
    ): Promise<() => void> {
        const dispose = await this.subscribe({
            url: 'md/subscribehistogram',
            body: {symbol},
            onSubscription
        })

        this.subscriptions.push({symbol, dispose})
        return dispose
    }

    async subscribeChart(
        symbol: string,
        chartDescription: ChartDescription,
        timeRange: TimeRange,
        onSubscription: (item: Chart) => void
    ): Promise<() => void> {
        const dispose = await this.subscribe({
            url: 'md/getchart',
            body: {symbol, chartDescription, timeRange},
            onSubscription
        })

        this.subscriptions.push({symbol, dispose})
        return dispose
    }
}
