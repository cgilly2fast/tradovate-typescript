import { URLs, credentials } from './config/tvCredentials'
import { connect } from './endpoints/connect'
import { setAccessToken, getAvailableAccounts } from './utils/storage'
import TradovateSocket  from './websockets/TradovateSocket'
import MarketDataSocket from './websockets/MarketDataSocket'
import {contractSuggest} from './endpoints/contractSuggest'
import { ElementSizeUnit, BarType,TimeRangeType } from './utils/types'
import TrendStrategy, { TrendStrategyParams } from './strageties/trend/trendStrategy'
//import{getLongBracket} from "./strageties/test/onChart"
import Strategy from './utils/stragety'
import {connectSockets, disconnectSockets, getSocket} from './utils/socketUtils'
import express, { Express, Request, Response } from 'express';
import {db} from "./config/fbCredentials"
import { getLongBracket, adjustStoploss} from "./strageties/trend/onChart"


const app: Express = express();
const port = 8080;

setAccessToken(""," ", "")


const main = async (symbol:string ="ES") => {
    console.log('[DevX Trader]: Started')

    await connect(credentials)
    
    await connectSockets({live: false, tvSocket: true, marketData:true, replay: false})
    const runsSnapshot = await db.collection('trade_runs').count().get()

    // const stragetyParams:TrendStrategyParams ={
    //     contract:{name:"ESU3", id:2665267},
    //     timeRangeType: TimeRangeType.AS_MUCH_AS_ELEMENTS,
    //     timeRangeValue: 2,
    //     devMode:false,
    //     replayPeriods: {},
    //     underlyingType:BarType.TICK, // Available values: Tick, DailyBar, MinuteBar, Custom, DOM
    //     elementSize:1000,
    //     elementSizeUnit:ElementSizeUnit.UNDERLYING_UNITS, // Available values: Volume, Range, UnderlyingUnits, Renko, MomentumRange, PointAndFigure, OFARange
    //     withHistogram: false,
    //     runId: runsSnapshot.data().count +1
    // }

    const stragetyParams:TrendStrategyParams ={
        contract:{name:"ESU3", id:2665267},
        timeRangeType: TimeRangeType.AS_MUCH_AS_ELEMENTS,
        timeRangeValue: 2,
        devMode:false,
        replayPeriods: {},
        underlyingType:BarType.MINUTE_BAR, // Available values: Tick, DailyBar, MinuteBar, Custom, DOM
        elementSize:1,
        elementSizeUnit:ElementSizeUnit.UNDERLYING_UNITS, // Available values: Volume, Range, UnderlyingUnits, Renko, MomentumRange, PointAndFigure, OFARange
        withHistogram: false,
        runId: runsSnapshot.data().count +1
    }

    await db.collection("trade_runs").doc(stragetyParams.runId+"").set(stragetyParams)

    try {
        const trend = new TrendStrategy(stragetyParams)
    } catch (err:any) {
        console.log(err)
        await disconnectSockets()
    }

   
 
}

// To-do's
// Confirm operation local testing
    // Adjust to breakeven,
    // Test with custom chart
// Crash reports
// Deploy to vm

main()

app.get('/', async  (req: Request, res: Response) => {
    res.send(`<div><button onclick=window.open('http://localhost:${port}/disconnect') >Disconnect</button><button onclick==window.open('http://localhost:${port}/cancelOrders')>Cancel Orders</button></div>`)
})

app.get('/connect', async  (req: Request, res: Response) => {
    main()
    res.send('[DevX Trader]: Started');
});

app.get('/disconnect', async  (req: Request, res: Response) => {
    await disconnectSockets()
    res.send('[DevX Trader]: Stopped');
});

app.get('/cancelOrders', async  (req: Request, res: Response) => {
    await cancelOrders()
    
    res.send('[DevX Trader]: Orders Cancelled');
});

app.listen(port, () => {
  console.log(`[DevX Trader]: ⚡️ Server is running at http://localhost:${port}`);
});

async function cancelOrders() {
    const socket = getSocket()
    const orders = await socket.request({
        url: 'order/list',
    })
    const activeOrders = orders.d.filter((order:any) => {return order.ordStatus === "Working"})

    activeOrders.forEach(async (order:any) =>{
        await socket.request({
            url: "order/cancelorder",
            body: {orderId: order.id}
        })
    })
    console.log('[DevX Trader]: Orders Cancelled')
}
 
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


    // ################ STOP TEST #################

    // await connectSockets({live: false, tvSocket: true, marketData:false, replay: false})
    // const socket = getSocket()
    

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

    // await adjustStoploss(5)


    
    