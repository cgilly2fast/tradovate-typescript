import {log} from 'console'
import {
    ChartDescription,
    ServerEvent,
    MdSocket,
    ResponseMsg,
    TimeRange,
    URLs,
    isServerEvent,
    isDomEventMsg,
    isHistogramEventMsg,
    isChartEventMsg,
    EndpointURLs,
    SubscribeURLs,
    MarketDataSocketSubscribeParams,
    isGetChartResponse,
    SubscribeChartParams,
    CancelBody,
    CancelChartBody
} from '../utils/types'
import {tvGet} from '../utils/service'
import RequestSocket from './RequestSocket'
export default class MarketDataSocket implements MdSocket {
    private socket: RequestSocket
    private subscriptions: Array<{
        symbol: string | number
        dispose: () => Promise<void>
    }>
    private subscribeCancelMap: Record<string, EndpointURLs>

    constructor(socket?: RequestSocket) {
        this.socket = socket ?? new RequestSocket(URLs.MD_URL)
        this.subscriptions = []
        this.subscribeCancelMap = {
            'md/subscribequote': 'md/unsubscribequote',
            'md/getchart': 'md/cancelchart',
            'md/subscribehistogram': 'md/unsubscribehistogram',
            'md/subscribedom': 'md/unsubscribedom'
        }
    }

    async connect() {
        return await this.socket.connect()
    }

    async disconnect(): Promise<void> {
        log('[DevX Trader]: Closing MarketDataSocket connection...')
        await this.disposeSubscriptions()
        this.socket.disconnect()
        log('[DevX Trader]: MarketDataSocket removed.')
    }

    isSubscribeUrl(url: EndpointURLs): boolean {
        return this.subscribeCancelMap[url] !== undefined
    }

    isConnected() {
        return this.socket.isConnected()
    }
    unsubscribe(symbol: string) {
        this.subscriptions
            .filter(sub => sub.symbol === symbol)
            .forEach(({dispose}, i) => {
                log(`Closing subscription to ${symbol}.`)
                this.subscriptions.splice(
                    this.subscriptions.indexOf(this.subscriptions[i]),
                    1
                )
                dispose()
            })
    }

    async subscribe<T extends EndpointURLs>(
        params: MarketDataSocketSubscribeParams<T>
    ): Promise<() => Promise<void>> {
        const {url, body, onSubscription} = params

        if (!this.isSubscribeUrl(url))
            throw new Error(`subscribe: ${url} is not a subscription url`)

        const {symbol, chartDescription, timeRange} = body as SubscribeChartParams

        let removeListener: () => void
        let cancelUrl = this.subscribeCancelMap[url]
        let cancelBody: CancelBody | CancelChartBody
        let contractId: number
        let realtimeId: number

        let response = await this.socket.request<T>({
            url,
            body
        })

        if (isGetChartResponse(response)) {
            realtimeId = response.d.realtimeId! || response.d.subscriptionId!
            cancelBody = {subscriptionId: realtimeId}
        } else {
            const contract = await tvGet('/contract/find', {name: symbol})
            if (!contract.id)
                throw new Error(
                    `Subscribe: ${url} Could not find contract id for symbol ${symbol}`
                )
            contractId = contract.id
            cancelBody = {symbol}
        }

        return new Promise((res, rej) => {
            switch (url.toLowerCase()) {
                case 'md/getchart': {
                    removeListener = this.socket.addListener(
                        (item: ResponseMsg<any> | ServerEvent) => {
                            if (isServerEvent(item) && isChartEventMsg(item.d)) {
                                item.d.charts.forEach((chart: any) =>
                                    chart.id === realtimeId ? onSubscription(chart) : null
                                )
                            }
                        }
                    )
                    break
                }
                case 'md/subscribedom': {
                    removeListener = this.socket.addListener((data: any) => {
                        if (data.d.doms) {
                            data.d.doms.forEach((dom: any) =>
                                dom.contractId === contractId ? onSubscription(dom) : null
                            )
                        }
                    })
                    break
                }
                case 'md/subscribequote': {
                    removeListener = this.socket.addListener((data: any) => {
                        if (data.d.quotes) {
                            data.d.quotes.forEach((quote: any) =>
                                quote.contractId === contractId
                                    ? onSubscription(quote)
                                    : null
                            )
                        }
                    })
                    break
                }
                case 'md/subscribehistogram': {
                    removeListener = this.socket.addListener((data: any) => {
                        if (data.d.histograms) {
                            data.d.histograms.forEach((histogram: any) =>
                                histogram.contractId === contractId
                                    ? onSubscription(histogram)
                                    : null
                            )
                        }
                    })
                    break
                }
            }

            res(async () => {
                removeListener()
                await this.socket.request({
                    url: cancelUrl,
                    body: cancelBody
                })
            })
        })
    }

    disposeSubscriptions() {
        for (let i = 0; i < this.subscriptions.length; i++) {
            this.subscriptions[i].dispose()
        }
        this.subscriptions = []
    }

    async subscribeQuote(
        symbol: string,
        onSubscription: (item: any) => void
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
        onSubscription: (item: any) => void
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
        onSubscription: (item: any) => void
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
        onSubscription: (item: any) => void
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
