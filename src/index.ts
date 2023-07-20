import { URLs, credentials } from './config/credentials'
import { connect } from './endpoints/connect'
import { setAccessToken, getAvailableAccounts } from './utils/storage'
import TradovateSocket  from './websockets/TradovateSocket'
import MarketDataSocket from './websockets/MarketDataSocket'
import {contractSuggest} from './endpoints/contractSuggest'
import { ElementSizeUnit, BarType,TimeRangeType } from './utils/types'
import TrendStrategy from './strageties/trend/trendStrategy'
//import{getLongBracket} from "./strageties/test/onChart"
import Strategy from './utils/stragety'
import {getSocket, getMdSocket} from './utils/socketUtils'


setAccessToken(""," ", "")

const { MD_URL, WS_DEMO_URL, WS_LIVE_URL } = URLs

const main = async (symbol:string ="ETH") => {

    const { accessToken, mdAccessToken } = await connect(credentials)
    
    const socket = getSocket()
    const mdSocket = getMdSocket()

    await Promise.all([
        socket.connect(URLs.WS_DEMO_URL),
        mdSocket.connect(URLs.MD_URL)
    ])

    const renewTokenInterval = setInterval(async () => {
        await connect(credentials) 
        
    }, 74.5*60*1000)

    try {
        const trend = new TrendStrategy({
            contract:{name:"ESU3", id:2665267},
            timeRangeType: TimeRangeType.AS_MUCH_AS_ELEMENTS,
            timeRangeValue: 2,
            devMode:false,
            replayPeriods: {},
            underlyingType:BarType.TICK, // Available values: Tick, DailyBar, MinuteBar, Custom, DOM
            elementSize:30,
            elementSizeUnit:ElementSizeUnit.UNDERLYING_UNITS, // Available values: Volume, Range, UnderlyingUnits, Renko, MomentumRange, PointAndFigure, OFARange
            withHistogram: false
        })
    } catch (err:any) {
        console.log(err)
        disconnect(socket, mdSocket, renewTokenInterval)
    }

    setTimeout(async () =>  {
        await disconnect(socket, mdSocket, renewTokenInterval)
    }, 25*60*1000);
 
}

async function disconnect(socket: any, mdSocket:any, renewTokenInterval:any) {
    await Promise.all([
        socket.disconnect(),
        mdSocket.disconnect()
    ]);
    clearInterval(renewTokenInterval)
}

main()

 // const brackets = getLongBracket(3,-20)
    // const entryVersion = {
    //     orderQty: 3,
    //     orderType: 'Market',
    // }

    // const orderData = {
    //     entryVersion,
    //     brackets
    // }

    // console.log("[DevX Trader]: " +JSON.stringify(orderData, null, 2))

    // const { id, name } = getAvailableAccounts()[0]
    
    // const body = {
    //     accountId: id,
    //     accountSpec: name,
    //     symbol: "ESU3",
    //     action: "Buy",
    //     orderStrategyTypeId: 2,
    //     params: JSON.stringify(orderData)
    // }

    // let dispose = socket.request({
    //     url: 'orderStrategy/startOrderStrategy',
    //     body,
    //     onResponse: (id, r) => {
    //         if(id === r.i) {
    //             console.log("[DevX Trader]: " +JSON.stringify(r, null, 2))
    //             //dispose()
    //         }
    //     }
    // })
    // const strats = await socket.request({
    //     url: 'orderStrategy/list',
    // })

    // const bracket = strats.d.filter((bracket:any) => {
    //     return bracket.status  === "ActiveStrategy"
    // })

    // const items = await socket.request({
    //     url: 'orderStrategyLink/deps',
    //     query: `masterid=${bracket[0].id}`,
    // })
    
    // const ids = items.d.map((item:any) =>{return item.id})
    
    // const orders = await socket.request({
    //     url: 'order/items',
    //     query: `ids=${ids}`,
    // })
   
    // const activeOrderIds = orders.d.filter((order:any) =>{
    //     return order.ordStatus === 'Working'
    // }).map((order:any) =>{return order.id})

    // const orderVersions = await socket.request({
    //     url: 'orderVersion/items',
    //     query: `ids=${activeOrderIds}`,
    // })
    // const stops = orderVersions.d.filter((order:any) =>{
    //     return order.orderType === 'Stop'
    // })

    
    // stops.forEach((stop:any) => {
    //     const bodya = {
    //         orderId: stop.id,
    //         orderQty:stop.orderQty,
    //         orderType: stop.orderType,
    //         stopPrice: stop.stopPrice+12,
    //         text: stop.text,
    //         isAutomated: true
    //     }
    //     let modified = socket.request({
    //         url: 'order/modifyorder',
    //         body:bodya,
    //         onResponse: (id, r) => {
    //             if(id === r.i) {
    //                 console.log("[DevX Trader]: " +JSON.stringify(r, null, 2))
    //                 //dispose()
    //             }
    //         }
    //     })
    // })
     
    

    // const { d } = await socket.request({
    //     url: 'contract/find',
    //     query: `name=ESU3`
    // })
   
    // console.log(d)
    
    

    //const mdSocket = new MarketDataSocket()
    //await mdSocket.connect(MD_URL)
    
    

    
    // unsubscribe = await mdSocket.getChart({
    //     symbol: "ESU3",//2665267
    //     chartDescription: {
    //         underlyingType:BarType.TICK, // Available values: Tick, DailyBar, MinuteBar, Custom, DOM
    //         elementSize:1000,
    //         elementSizeUnit: ElementSizeUnit.UNDERLYING_UNITS, // Available values: Volume, Range, UnderlyingUnits, Renko, MomentumRange, PointAndFigure, OFARange
    //         withHistogram: false
    //     },
    //     timeRange: {
    //         asMuchAsElements:20
    //     },
    //     callback: (chart) =>{console.log("chart",chart)}
       // })