import 'dotenv/config'
import {credentials} from './config/tvCredentials'
import {connect} from './endpoints/connect'
import {setAccessToken} from './utils/storage'
import {ElementSizeUnit, BarType, TimeRangeType, TvSocket, MdSocket} from './utils/types'
import TrendStrategy, {TrendStrategyBodyParams} from './strategies/trendv2/trendStrategy'
import express, {Express, Request, Response} from 'express'
import {db} from './config/fbCredentials'
import {contractFind} from './endpoints/contractFind'
import ReplaySocket from './websockets/ReplaySocket'
import TradovateSocket from './websockets/TradovateSocket'
import MarketDataSocket from './websockets/MarketDataSocket'

const app: Express = express()
const port = 8080
const REPLAY = true
const LIVE = false
let tvSocket: TvSocket
let mdSocket: MdSocket
let replaySocket: ReplaySocket

setAccessToken('', ' ', '')

const main = async (symbol: string = 'ES') => {
    console.log('[DevX Trader]: Started')

    await connect(credentials)

    if (REPLAY) {
        tvSocket = mdSocket = replaySocket = new ReplaySocket()
    } else {
        tvSocket = new TradovateSocket(LIVE)
        mdSocket = new MarketDataSocket()
    }

    const contract = await contractFind(symbol)
    console.log(contract)

    await Promise.all([tvSocket.connect(), mdSocket.connect()])

    const runsSnapshot = await db.collection('trade_runs').count().get()
    const runId = runsSnapshot.data().count + 1

    console.log('[DevX Trader]: Run Id: ' + runId)

    const bodyParams: TrendStrategyBodyParams = {
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

    try {
        await db
            .collection('trade_runs')
            .doc(bodyParams.runId + '')
            .set(bodyParams)

        new TrendStrategy(bodyParams, {tvSocket, mdSocket, replaySocket})
    } catch (err) {
        console.log(err)
        await Promise.all([mdSocket.disconnect(), tvSocket.disconnect()])
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
    await Promise.all([mdSocket.disconnect(), tvSocket.disconnect()])
    res.send('[DevX Trader]: Stopped')
})

app.get('/cancelOrders', async (req: Request, res: Response) => {
    await cancelOrders()

    res.send('[DevX Trader]: Orders Cancelled')
})

app.get('/speedUpReplay', async (req: Request, res: Response) => {
    if (REPLAY) {
        const speed = req.query.speed ? parseInt(req.query.speed as string) : 400
        try {
            const response = await tvSocket.request({
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
    const orders = await tvSocket.request({url: 'order/list'})
    const activeOrders = orders.d.filter((order: any) => {
        return order.ordStatus === 'Working'
    })

    activeOrders.forEach(async (order: any) => {
        await tvSocket.request({
            url: 'order/cancelorder',
            body: {orderId: order.id}
        })
    })
    console.log('[DevX Trader]: Orders Cancelled')
}
