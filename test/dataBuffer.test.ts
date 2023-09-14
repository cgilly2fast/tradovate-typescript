import {barsTransformer, ticksTransformer} from '../src/utils/dataBuffer' // Import your utility functions

describe('barsTransformer Function Tests', () => {
    it('should transform a BarPacket with bars data', () => {
        const packet = {
            id: 1,
            td: 20220101,
            bars: [
                {
                    timestamp: '2022-01-01T00:00:00Z',
                    open: 100,
                    high: 110,
                    low: 90,
                    close: 105,
                    upVolume: 1000,
                    downVolume: 500,
                    upTicks: 50,
                    downTicks: 25,
                    bidVolume: 200,
                    offerVolume: 150
                }
                // Add more bars
            ]
        }

        const result = barsTransformer(packet)

        expect(result).toEqual(packet.bars)
    })

    it('should handle a BarPacket with empty bars data', () => {
        const packet = {
            id: 2,
            td: 20220102,
            bars: []
        }

        const result = barsTransformer(packet)

        expect(result).toEqual([])
    })
})

describe('ticksTransformer Function Tests', () => {
    it('should transform a TickPacket with tick data', () => {
        const packet = {
            id: 1,
            eoh: false,
            s: 'source',
            td: '20220101',
            bp: 100,
            bt: 1640995200000,
            ts: 1,
            tks: [
                {
                    id: 1,
                    t: 10,
                    p: 5,
                    s: 100,
                    b: 3,
                    a: 7,
                    bs: 20,
                    as: 15
                }
                // Add more tick data
            ]
        }

        const result = ticksTransformer(packet)

        expect(result).toEqual([
            {
                subscriptionId: 1,
                id: 1,
                contractTickSize: 1,
                timestamp: '2022-01-01T00:00:00.010Z',
                price: 105,
                volume: 100,
                bidPrice: 103,
                bidSize: 20,
                askPrice: 107,
                askSize: 15
            }
            // Add more expected results
        ])
    })

    it('should handle a TickPacket with empty tks data', () => {
        const packet = {
            id: 2,
            eoh: true,
            s: 'source',
            td: '20220102',
            bp: 200,
            bt: 0,
            ts: 0.5,
            tks: [] // Empty tks array
        }

        const result = ticksTransformer(packet)

        expect(result).toEqual([])
    })
})
