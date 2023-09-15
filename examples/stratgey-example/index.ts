import 'dotenv/config'
import {credentials} from './credentials'
import {TradovateService, TimeRangeType, BarType, ElementSizeUnit} from '../../src'
import SimpleStrategy from './simpleStrategy'

const REPLAY = false
const LIVE = false

const service = new TradovateService()
let strategy = new SimpleStrategy()

async function main() {
    const params: SimpleStrategyParams = {
        live: LIVE,
        contract: {name: 'ESU3', id: 2665267},
        timeRangeType: TimeRangeType.AsMuchAsElements,
        timeRangeValue: 2,
        replayMode: REPLAY,
        replayPeriods: [
            {
                start: `2023-08-14T13:00:00.000Z`, //use your local time, new Dat(YYYY-DD-MM).toJSON() will transform it to universal
                stop: `2023-08-14T14:05:00.000Z`
            }
        ],
        underlyingType: BarType.Tick, // Available values: Tick, DailyBar, MinuteBar, Custom, DOM
        elementSize: 1000,
        elementSizeUnit: ElementSizeUnit.UnderlyingUnits, // Available values: Volume, Range, UnderlyingUnits, Renko, MomentumRange, PointAndFigure, OFARange
        withHistogram: false
    }

    try {
        strategy = new SimpleStrategy(params)
    } catch (err) {
        console.log(err)
        await strategy.disconnect()
    }
}
