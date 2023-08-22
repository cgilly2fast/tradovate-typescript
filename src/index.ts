import { URLs, credentials } from './config/tvCredentials'
import { connect } from './endpoints/connect'
import { setAccessToken, getCurrentAccount } from './utils/storage'
import { ElementSizeUnit, BarType,TimeRangeType } from './utils/types'
import TrendStrategy, { TrendStrategyParams } from './strageties/trendv2/trendStrategy'
import {connectSockets, disconnectReplaySocket, disconnectSockets, getSocket, getReplaySocket} from './utils/socketUtils'
import express, { Express, Request, Response } from 'express';
import {db} from "./config/fbCredentials"
import { getLongBracket, adjustStoploss} from "./strageties/trendv2/onChart"


const app: Express = express();
const port = 8080;
const replay = true

setAccessToken(""," ", "")


const main = async (symbol:string ="ES") => {
    console.log('[DevX Trader]: Started')

    await connect(credentials)  

    await connectSockets({live: false, tvSocket: !replay, marketData:!replay, replay: replay})
    const runsSnapshot = await db.collection('trade_runs').count().get()
    const runId = runsSnapshot.data().count +1
    console.log("[DevX Trader]: Run Id: " +runId)

    const stragetyParams:TrendStrategyParams ={
        contract:{name:"ESU3", id:2665267},
        timeRangeType: TimeRangeType.AS_MUCH_AS_ELEMENTS,
        timeRangeValue: 2,
        devMode:replay,
        replayPeriods: [{
            start:  `2023-08-14T13:00:00.000Z`, //use your local time, new Dat(YYYY-DD-MM).toJSON() will transform it to universal
            stop:   `2023-08-14T20:05:00.000Z`
        },{
            start:  `2023-08-15T13:00:00.000Z`, 
            stop:   `2023-08-15T20:00:00.000Z`
        },{
            start:  `2023-08-16T13:00:00.000Z`, 
            stop:   `2023-08-16T20:00:00:000Z`
        },{
            start:  `2023-08-17T13:00:00.000Z`, 
            stop:   `2023-08-17T20:00:00:000Z`
        },{
            start:  `2023-08-18T13:00:00.000Z`, 
            stop:   `2023-08-1820:00:00.000Z`
        }],
        underlyingType:BarType.TICK, // Available values: Tick, DailyBar, MinuteBar, Custom, DOM
        elementSize:1000,
        elementSizeUnit:ElementSizeUnit.UNDERLYING_UNITS, // Available values: Volume, Range, UnderlyingUnits, Renko, MomentumRange, PointAndFigure, OFARange
        withHistogram: false,
        runId: runId
    }

    // const stragetyParams:TrendStrategyParams ={
    //     contract:{name:"ESU3", id:2665267},
    //     timeRangeType: TimeRangeType.AS_MUCH_AS_ELEMENTS,
    //     timeRangeValue: 2,
    //     devMode:replay,
    //     replayPeriods: [{
    //         start: new Date(`2023-08-08T03:30`), //use your local time, .toJSON will transform it to universal
    //         stop: new Date(`2023-08-08T09:30`)
    //     }],
    //     underlyingType:BarType.MINUTE_BAR, // Available values: Tick, DailyBar, MinuteBar, Custom, DOM
    //     elementSize:1,
    //     elementSizeUnit:ElementSizeUnit.UNDERLYING_UNITS, // Available values: Volume, Range, UnderlyingUnits, Renko, MomentumRange, PointAndFigure, OFARange
    //     withHistogram: false,
    //     runId: runId
    // }

    await db.collection("trade_runs").doc(stragetyParams.runId+"").set(stragetyParams)

    try {
        const trend = new TrendStrategy(stragetyParams)
    } catch (err:any) {
        console.log(err)
        await disconnectSockets()
    }

   
 
}


main()

app.get('/', async  (req: Request, res: Response) => {
    res.send(`<div><button onclick=window.open('http://localhost:${port}/disconnect') >Disconnect</button><button onclick==window.open('http://localhost:${port}/cancelOrders')>Cancel Orders</button></div>`)
})

app.get('/connect', async  (req: Request, res: Response) => {
    main()
    res.send('[DevX Trader]: Started');
});

app.get('/disconnect', async  (req: Request, res: Response) => {
    if(replay) {
        await disconnectReplaySocket()
    } else {
        await disconnectSockets()
    }
    res.send('[DevX Trader]: Stopped');
});

app.get('/cancelOrders', async  (req: Request, res: Response) => {
    await cancelOrders()
    
    res.send('[DevX Trader]: Orders Cancelled');
});

app.get('/speedUpReplay', async  (req: Request, res: Response) => {
    if(replay) {
        const speed = (req.query.speed? parseInt(req.query.speed as string): 400)
        const replaySocket = getReplaySocket()
        const response = await replaySocket.request({
            url:'replay/changespeed',
            body:{"speed": speed},
            onResponse: (id, r) => {
                if(id === r.i) {
                    if(r.s === 200) {
                        console.log(`[DevX Trader]: Replay socket speed changed to ${speed}`)
                    } else {
                        console.log('[DevX Trader]: Error Replay socket speed restoration ' +JSON.stringify(r, null, 2))
                    }
                }
            }
        })
        if(response.d.ok){
            res.send(`[DevX Trader]: Replay speed updated to ${speed}`);
        } else {
            
        } 
    } else {
        console.log('[DevX Trader]: Not in replay mode')
        res.send('[DevX Trader]: Not in replay mode');
    }
});

app.listen(port, () => {
  console.log(`[DevX Trader]: ⚡️ Server is running at http://localhost:${port}`);
});

async function cancelOrders() {
    const socket = replay ? getReplaySocket() : getSocket()
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
    // const socket = devMode ? getReplaySocket() : getSocket()
    

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

    // const { id, name } = getCurrentAccount()[0]
    
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

    // await adjustStoploss(5, replay)


    
    