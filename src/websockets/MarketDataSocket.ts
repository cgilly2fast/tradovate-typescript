import TradovateSocket from './TradovateSocket'
import {
    Quote,
    DOM,
    Histogram,
    ChartDescription,
    isResponseMsg,
    isServerEvent,
    ServerEvent,
    ServerEventMessageMap,
    ResponseMsg,
    QuoteEvent,
    SubscribeChartParams,
    SubscribeDOMParams,
    SubscribeHistogramParams,
    SubscribeQuoteParams,
    MarketDataSocketSubscribeParams
} from '../utils/types'
import { URLs } from '../config/tvCredentials'


export default class MarketDataSocket {
    private tradovateSocket: TradovateSocket
    private subscriptions: Array<{
        symbol: string | number
        subscription: () => Promise<void>
    }>

    constructor() {
        this.tradovateSocket = new TradovateSocket()
        
        this.subscriptions = []
    }

    async connect() {
        return await this.tradovateSocket.connect(URLs.MD_URL)
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
        this.tradovateSocket.disconnect()
    }

    isConnected() {
        return this.tradovateSocket.isConnected()
    }

    async subscribe<T extends keyof ServerEventMessageMap>(
        params: MarketDataSocketSubscribeParams,
      ): Promise<() => Promise<void>> {
        const { url, body, onSubscription } = params
    
        let removeListener: () => void
        let cancelUrl: string
        let cancelBody: Object
        let contractId: number
    
        let response: any = await this.tradovateSocket.request({ url, body })
        const realtimeId = response?.d?.realtimeId || response?.d?.subscriptionId
        return new Promise((res, rej) => {
          switch (url.toLowerCase()) {
            case 'md/getchart': {
              cancelUrl = 'md/cancelChart'
              cancelBody = { subscriptionId: realtimeId }
              removeListener = this.tradovateSocket.addListener((data: any) => {
                if (data.d.charts) {
                  data.d.charts.forEach((chart: any) =>
                    chart.id === realtimeId ? onSubscription(chart) : null,
                  )
                }
              })
              break
            }
            case 'md/subscribedom': {
              cancelUrl = 'md/unsubscribedom'
              cancelBody = { symbol: body.symbol }
              removeListener = this.tradovateSocket.addListener((data: any) => {
                if (data.d.doms) {
                  data.d.doms.forEach((dom: any) =>
                    dom.contractId === contractId ? onSubscription(dom) : null,
                  )
                }
              })
              break
            }
            case 'md/subscribequote': {
              cancelUrl = 'md/unsubscribequote'
              cancelBody = { symbol: body.symbol }
              removeListener = this.tradovateSocket.addListener((data: any) => {
                if (data.d.quotes) {
                  data.d.quotes.forEach((quote: any) =>
                    quote.contractId === contractId ? onSubscription(quote) : null,
                  )
                }
              })
              break
            }
            case 'md/subscribehistogram': {
              cancelUrl = 'md/unsubscribehistogram'
              cancelBody = { symbol: body.symbol }
              removeListener = this.tradovateSocket.addListener((data: any) => {
                if (data.d.histograms) {
                  data.d.histograms.forEach((histogram: any) =>
                    histogram.contractId === contractId
                      ? onSubscription(histogram)
                      : null,
                  )
                }
              })
              break
            }
            default:
              rej('[DevX Trader]: Not a subscribe endpoint.')
              break
          }
    
          res(async () => {
            removeListener()
            if (cancelUrl && cancelUrl !== '') {
              await this.tradovateSocket.request({ url: cancelUrl, body: cancelBody })
            }
          })
        })
      }
      
    async subscribeQuote(
        params: SubscribeQuoteParams,
    ) {
        const {symbol, onSubscription} = params

        const subscription = await this.subscribe({
            url: 'md/subscribeQuote',
            body: { symbol },
            onSubscription
        })

        this.subscriptions.push({ symbol, subscription })
        return subscription
    }

    async subscribeDOM(
        params: SubscribeDOMParams,
    ) {
        const {symbol, onSubscription} = params

        const subscription = await this.subscribe({
            url: 'md/subscribeDOM', 
            body: { symbol },
            onSubscription
        })

        this.subscriptions.push({ symbol, subscription })
        return subscription
    
    }

    async subscribeHistogram(
        params: SubscribeHistogramParams,
    ) {
        const {symbol, onSubscription} = params

        const subscription = await this.subscribe({
            url: 'md/subscribeDOM', 
            body: { symbol },
            onSubscription
        })

        this.subscriptions.push({ symbol, subscription })
        return subscription
    
    }

    async subscribeChart(
        params: SubscribeChartParams,
    ) {
        const { symbol, chartDescription, timeRange, onSubscription} = params 

        // check if onSubscription chart id is item.d.realtimeId or item.d.historicalId
        const subscription = await this.subscribe({
            url: 'md/getChart',
            body: {
                symbol,
                chartDescription,
                timeRange,
            },
            onSubscription
        })

        this.subscriptions.push({ symbol, subscription })
        return subscription
    
    }
}
