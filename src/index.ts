import 'dotenv/config'
import {credentials} from './config/tvCredentials'
import {connect} from './endpoints/connect'
import {setAccessToken} from './utils/storage'
import {ElementSizeUnit, BarType, TimeRangeType} from './utils/types'
import TrendStrategy, {TrendStrategyParams} from './strageties/trendv2/trendStrategy'
import {
    connectSockets,
    disconnectReplaySocket,
    disconnectSockets,
    getSocket,
    getReplaySocket
} from './utils/socketUtils'
import express, {Express, Request, Response} from 'express'
import {db} from './config/fbCredentials'
import {contractFind} from './endpoints/contractFind'

const app: Express = express()
const port = 8080
const REPLAY = true
const LIVE = false

setAccessToken('', ' ', '')

const main = async (symbol: string = 'ES') => {
    console.log('[DevX Trader]: Started')

    await connect(credentials)

    const contract = await contractFind(symbol)
    console.log(contract)
    await connectSockets(REPLAY, LIVE)
    const runsSnapshot = await db.collection('trade_runs').count().get()
    const runId = runsSnapshot.data().count + 1
    console.log('[DevX Trader]: Run Id: ' + runId)

    const strategyParams: TrendStrategyParams = {
        contract: {name: 'ESU3', id: 2665267},
        timeRangeType: TimeRangeType.AS_MUCH_AS_ELEMENTS,
        timeRangeValue: 2,
        replayMode: REPLAY,
        replayPeriods: [
            {
                start: `2023-08-14T13:00:00.000Z`, //use your local time, new Dat(YYYY-DD-MM).toJSON() will transform it to universal
                stop: `2023-08-14T14:05:00.000Z`
            },
            {
                start: `2023-08-15T13:00:00.000Z`,
                stop: `2023-08-15T20:00:00.000Z`
            },
            {
                start: `2023-08-16T13:00:00.000Z`,
                stop: `2023-08-16T20:00:00:000Z`
            },
            {
                start: `2023-08-17T13:00:00.000Z`,
                stop: `2023-08-17T20:00:00:000Z`
            },
            {
                start: `2023-08-18T13:00:00.000Z`,
                stop: `2023-08-1820:00:00.000Z`
            }
        ],
        underlyingType: BarType.TICK, // Available values: Tick, DailyBar, MinuteBar, Custom, DOM
        elementSize: 1000,
        elementSizeUnit: ElementSizeUnit.UNDERLYING_UNITS, // Available values: Volume, Range, UnderlyingUnits, Renko, MomentumRange, PointAndFigure, OFARange
        withHistogram: false,
        runId: runId
    }

    // const strategyParams:TrendStrategyParams ={
    //     contract:{name:"ESU3", id:2665267},
    //     timeRangeType: TimeRangeType.AS_MUCH_AS_ELEMENTS,
    //     timeRangeValue: 2,
    //     replayMode:replay,
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

    await db
        .collection('trade_runs')
        .doc(strategyParams.runId + '')
        .set(strategyParams)

    try {
        new TrendStrategy(strategyParams)
    } catch (err) {
        console.log(err)
        await disconnectSockets()
    }
}

main()

app.get('/', async (req: Request, res: Response) => {
    res.send(
        `<div><button onclick=window.open('http://localhost:${port}/disconnect') >Disconnect</button><button onclick==window.open('http://localhost:${port}/cancelOrders')>Cancel Orders</button></div>`
    )
})

app.get('/connect', async (req: Request, res: Response) => {
    main()
    res.send('[DevX Trader]: Started')
})

app.get('/disconnect', async (req: Request, res: Response) => {
    if (REPLAY) {
        await disconnectReplaySocket()
    } else {
        await disconnectSockets()
    }
    res.send('[DevX Trader]: Stopped')
})

app.get('/cancelOrders', async (req: Request, res: Response) => {
    await cancelOrders()

    res.send('[DevX Trader]: Orders Cancelled')
})

app.get('/speedUpReplay', async (req: Request, res: Response) => {
    if (REPLAY) {
        const speed = req.query.speed ? parseInt(req.query.speed as string) : 400
        const replaySocket = getReplaySocket()
        try {
            const response = await replaySocket.request({
                url: 'replay/changespeed',
                body: {speed: speed}
            })

            if (response.d.ok) res.send(`[DevX Trader]: Replay speed updated to ${speed}`)

            res.send(`[DevX Trader]: Replay speed not updated. Try again.`)
        } catch (err) {
            res.send(`[DevX Trader]: Replay speed not updated. Try again. Error: ${err}`)
        }
    } else {
        console.log('[DevX Trader]: Not in replay mode')
        res.send('[DevX Trader]: Not in replay mode')
    }
})

app.listen(port, () => {
    console.log(`[DevX Trader]: ⚡️ Server is running at http://localhost:${port}`)
})

async function cancelOrders() {
    const socket = getSocket()
    const orders = await socket.request({url: 'order/list'})
    const activeOrders = orders.d.filter((order: any) => {
        return order.ordStatus === 'Working'
    })

    activeOrders.forEach(async (order: any) => {
        await socket.request({
            url: 'order/cancelorder',
            body: {orderId: order.id}
        })
    })
    console.log('[DevX Trader]: Orders Cancelled')
}
