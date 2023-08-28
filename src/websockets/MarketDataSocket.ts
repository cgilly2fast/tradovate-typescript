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
    isChartEventMsg
} from '../utils/types'
import {tvGet} from '../utils/service'
import RequestSocket from './RequestSocket'
export default class MarketDataSocket implements MdSocket {
    private socket: RequestSocket
    private subscriptions: Array<{
        symbol: string | number
        dispose: () => Promise<void>
    }>

    constructor(socket?: RequestSocket) {
        this.socket = socket ?? new RequestSocket(URLs.MD_URL)
        this.subscriptions = []
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
        const contract = await tvGet('/contract/find', {name: symbol})
        if (!contract.id)
            throw new Error(
                `SubscribeQuote: Could not find contract id for symbol ${symbol}`
            )

        await this.socket.request({
            url: 'md/subscribequote',
            body: {symbol}
        })

        const listener = (data: ResponseMsg<any> | ServerEvent<any>) => {
            if (data.d.quotes) {
                data.d.quotes.forEach((quote: any) =>
                    quote.contractId === contract.id ? onSubscription(quote) : null
                )
            }
        }

        const removeListener = this.socket.addListener(listener)
        const dispose = async () => {
            removeListener()
            await this.socket.request({
                url: 'md/unsubscribequote',
                body: {symbol}
            })
        }

        this.subscriptions.push({symbol, dispose})
        return dispose
    }

    async subscribeDOM(
        symbol: string,
        onSubscription: (item: any) => void
    ): Promise<() => void> {
        const contract = await tvGet('/contract/find', {name: symbol})
        if (!contract.id)
            throw new Error(
                `SubscribeDOM: Could not find contract id for symbol ${symbol}`
            )

        await this.socket.request({
            url: 'md/subscribedom',
            body: {symbol}
        })

        const listener = (data: ResponseMsg<any> | ServerEvent<any>) => {
            if (isServerEvent(data) && isDomEventMsg(data.d)) {
                data.d.doms.forEach(dom =>
                    dom.contractId === contract.id ? onSubscription(dom) : null
                )
            }
        }
        const removeListener = this.socket.addListener(listener)
        const dispose = async () => {
            removeListener()
            await this.socket.request({
                url: 'md/unsubscribedom',
                body: {symbol}
            })
        }
        this.subscriptions.push({symbol, dispose})
        return dispose
    }

    async subscribeHistogram(
        symbol: string,
        onSubscription: (item: any) => void
    ): Promise<() => void> {
        const contract = await tvGet('/contract/find', {name: symbol})
        if (!contract.id)
            throw new Error(
                `SubscribeHistogram: Could not find contract id for symbol ${symbol}`
            )

        await this.socket.request({
            url: 'md/subscribehistogram',
            body: {symbol}
        })

        const listener = (data: ResponseMsg<any> | ServerEvent<any>) => {
            if (isServerEvent(data) && isHistogramEventMsg(data.d)) {
                data.d.histograms.forEach(histogram =>
                    histogram.contractId === contract.id
                        ? onSubscription(histogram)
                        : null
                )
            }
        }

        const removeListener = this.socket.addListener(listener)

        const dispose = async () => {
            removeListener()
            await this.socket.request({
                url: 'md/unsubscribehistogram',
                body: {symbol}
            })
        }
        this.subscriptions.push({symbol, dispose})
        return dispose
    }

    async subscribeChart(
        symbol: string,
        chartDescription: ChartDescription,
        timeRange: TimeRange,
        onSubscription: (item: any) => void
    ): Promise<() => void> {
        const contract = await tvGet('/contract/find', {name: symbol})
        if (!contract.id)
            throw new Error(
                `subscribeChart: Could not find contract id for symbol ${symbol}`
            )

        const response = await this.socket.request({
            url: 'md/getchart',
            body: {symbol, chartDescription, timeRange}
        })

        const realtimeId: number = response.d.realtimeId || response.d.subscriptionId

        const listener = (data: ResponseMsg<any> | ServerEvent<any>) => {
            if (isServerEvent(data) && isChartEventMsg(data.d)) {
                data.d.charts.forEach((chart: any) =>
                    chart.id === realtimeId ? onSubscription(chart) : null
                )
            }
        }

        const removeListener = this.socket.addListener(listener)

        const dispose = async () => {
            removeListener()
            await this.socket.request({
                url: 'md/cancelchart',
                body: {subscriptionId: realtimeId}
            })
        }

        this.subscriptions.push({symbol, dispose})

        return dispose
    }
}

//  private urlToType:Record<string,EndpointURLs>
// this.urlToType = {
//     'replay/initializeclock':'replay/initializeclock',
//     'user/syncrequest':'user/syncrequest' ,
//     'md/subscribeQuote':'md/subscribeQuote',
//     'md/getChart':'md/getChart',
//     'md/subscribeHistogram':'md/subscribeHistogram' ,
//     'md/subscribeDOM':'md/subscribeDOM',
//     'md/unsubscribehistogram': 'md/unsubscribehistogram',
//     'md/unsubscribequote':'md/unsubscribequote',
//     'md/unsubscribedom': 'md/unsubscribedom',
//     'md/cancelChart':'md/cancelChart',
// }

// async subscribe<T extends SubscribeURLs>(
//   ): Promise<() => Promise<void>> {
//     const { url, body, onSubscription } = params

//     let removeListener: () => void
//     let cancelUrl: string
//     let cancelBody: unknown
//     let contractId: number
//    const tesUrl: T = url
//     let response: any = await this.socket.request<T>({
//         url:(url as T),
//         body
// })
//     const realtimeId:number = response?.d?.realtimeId || response?.d?.subscriptionId
//     return new Promise((res, rej) => {
//       switch (url.toLowerCase()) {
//         case 'md/getchart': {
//           cancelUrl = 'md/cancelChart'
//           cancelBody = { subscriptionId: realtimeId } as EndpointRequestBody['md/cancelchart']
//           removeListener = this.socket.addListener((data: any) => {
//             if (data.d.charts) {
//               data.d.charts.forEach((chart: any) =>
//                 chart.id === realtimeId ? onSubscription(chart) : null,
//               )
//             }
//           })
//           break
//         }
//         case 'md/subscribedom': {
//           cancelUrl = 'md/unsubscribedom'
//           cancelBody = { symbol: body.symbol }
//           removeListener = this.socket.addListener((data: any) => {
//             if (data.d.doms) {
//               data.d.doms.forEach((dom: any) =>
//                 dom.contractId === contractId ? onSubscription(dom) : null,
//               )
//             }
//           })
//           break
//         }
//         case 'md/subscribequote': {
//           cancelUrl = 'md/unsubscribequote'
//           cancelBody = { symbol: body.symbol }
//           removeListener = this.socket.addListener((data: any) => {
//             if (data.d.quotes) {
//               data.d.quotes.forEach((quote: any) =>
//                 quote.contractId === contractId ? onSubscription(quote) : null,
//               )
//             }
//           })
//           break
//         }
//         case 'md/subscribehistogram': {
//           cancelUrl = 'md/unsubscribehistogram'
//           cancelBody = { symbol: body.symbol }
//           removeListener = this.socket.addListener((data: any) => {
//             if (data.d.histograms) {
//               data.d.histograms.forEach((histogram: any) =>
//                 histogram.contractId === contractId
//                   ? onSubscription(histogram)
//                   : null,
//               )
//             }
//           })
//           break
//         }
//         default:
//           rej('[DevX Trader]: Not a subscribe endpoint.')
//           break
//       }

//       res(async () => {
//         removeListener()
//         if (cancelUrl && cancelUrl !== '') {
//           await this.socket.request({ url: this.urlToType[cancelUrl], body: cancelBody })
//         }
//       })
//     })
//   }
