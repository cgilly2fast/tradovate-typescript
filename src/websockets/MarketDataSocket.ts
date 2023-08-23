import TradovateSocket from './TradovateSocket'
import { Quote, DOM, Histogram, ChartRequest, Item } from '../utils/types'

export interface MarketDataSocketSubscribeParams {
    symbol: string
    contractId: number
    callback: (value: any, index: number, array: any[]) => void
}

export interface MarketDataSocketGetChartParams extends ChartRequest {
    callback?: (value: any, index: number, array: any[]) => void
}

export default class MarketDataSocket extends TradovateSocket {
    public subscriptions: Array<{
        symbol: string | number
        subscription: () => Promise<void>
    }>

    constructor() {
        super()
        this.subscriptions = []
    }

    unsubscribe(symbol: string | number) {
        this.subscriptions
            .filter(sub => sub.symbol === symbol)
            .forEach(({ subscription }, i) => {
                console.log(`Closing subscription to ${symbol}.`)
                this.subscriptions.splice(
                    this.subscriptions.indexOf(this.subscriptions[i]),
                    1,
                )
                subscription()
            })
    }

    disconnect(): void {
        this.subscriptions.forEach(({ subscription }) => subscription())
        this.subscriptions = []
        super.disconnect()
    }

    async subscribeQuote(params: MarketDataSocketSubscribeParams) {
        const { symbol, contractId, callback } = params
        const isQuote = (data: any) =>
            data.e && data.e === 'md' && data.d && data.d.quotes

        // if contract id is undefined then look up?

        const sendCallback = (id: number, item: Item) => {
            if (!isQuote(item)) return

            const quotes: Quote[] = item.d.quotes

            quotes
                .filter((quote: Quote) => {
                    return quote.contractId === contractId
                })
                .forEach(callback!)
        }

        const subscription = await this.request({
            url: 'md/subscribeQuote',
            body: { symbol },
            onResponse: sendCallback,
            disposer: () => {
                this.request({
                    url: 'md/unsubscribeQuote',
                    body: {
                        symbol,
                    },
                })
            },
        })

        this.subscriptions.push({ symbol, subscription })
        return subscription
    }

    async subscribeDOM(params: MarketDataSocketSubscribeParams) {
        const { symbol, contractId, callback } = params
        const isDom = (data: any) =>
            data.e && data.e === 'md' && data.d && data.d.doms

        const subscription = await this.request({
            url: 'md/subscribeDOM',
            body: { symbol },
            onResponse: (id, item) => {
                if (!isDom(item)) return
                const doms: DOM[] = item.d.doms
                doms.filter(dom => {
                    return dom.contractId === contractId
                }).forEach(callback!)
            },
            disposer: () => {
                this.request({
                    url: 'md/unsubscribeDOM',
                    body: {
                        symbol,
                    },
                })
            },
        })

        this.subscriptions.push({ symbol, subscription })

        return subscription
    }

    async subscribeHistogram(params: MarketDataSocketSubscribeParams) {
        const { symbol, contractId, callback } = params

        const isHistogram = (data: any) =>
            data.e && data.e === 'md' && data.d && data.d.histograms

        const subscription = await this.request({
            url: 'md/subscribeHistogram',
            body: { symbol },
            onResponse: (id, item) => {
                if (!isHistogram(item)) return

                const histograms: Histogram[] = item.d.histograms
                histograms
                    .filter(histogram => {
                        return histogram.contractId === contractId
                    })
                    .forEach(callback!)
            },
            disposer: () => {
                this.request({
                    url: 'md/unsubscribeHistogram',
                    body: {
                        symbol,
                    },
                })
            },
        })

        this.subscriptions.push({ symbol, subscription })

        return subscription
    }

    async getChart(params: MarketDataSocketGetChartParams) {
        const { symbol, chartDescription, timeRange, callback } = params
        const isChart = (data: any) => data.e && data.e === 'chart'

        let realtimeId: number
        let historicalId: number

        const subscription = await this.request({
            url: 'md/getChart',
            body: {
                symbol,
                chartDescription,
                timeRange,
            },
            onResponse: (id, item) => {
                if (item.i === id) {
                    realtimeId = item.d.realtimeId
                    historicalId = item.d.historicalId
                }

                if (!isChart(item)) return

                const charts: any[] = item.d.charts // TickPacket[] | BarPacket[]

                charts
                    .filter(chart => {
                        return (
                            chart.id === realtimeId || chart.id === historicalId
                        )
                    })
                    .forEach(callback!)
            },
            disposer: () => {
                this.request({
                    url: 'md/cancelChart',
                    body: {
                        subscriptionId: historicalId,
                    },
                })
            },
        })
        this.subscriptions.push({ symbol, subscription })

        return subscription
    }
}
