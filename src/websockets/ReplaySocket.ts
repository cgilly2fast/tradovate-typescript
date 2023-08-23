import MarketDataSocket from './MarketDataSocket'

export interface ReplaySocketCheckReplaySessionParams {
    startTimestamp: string
    callback: any
}

export interface ReplaySocketInitializeClockParams
    extends ReplaySocketCheckReplaySessionParams {
    speed?: number
    initialBalance?: number
}

export default class ReplaySocket extends MarketDataSocket {
    constructor() {
        super()
    }

    checkReplaySession(params: ReplaySocketCheckReplaySessionParams) {
        const { startTimestamp, callback } = params
        return this.request({
            url: 'replay/checkreplaysession',
            body: { startTimestamp },
            onResponse: (id, item) => {
                if (item.i === id) {
                    callback(item.d)
                }
            },
        })
    }

    initializeClock(params: ReplaySocketInitializeClockParams) {
        const { callback, startTimestamp, speed, initialBalance } = params

        return this.request({
            url: 'replay/initializeclock',
            body: {
                startTimestamp,
                speed: speed ?? 400,
                initialBalance: initialBalance ?? 50000,
            },
            onResponse: (id, item) => {
                if (id === item.i && item.s === 200) {
                    callback()
                } else if (item.e && item.e === 'clock') {
                    callback(item)
                }
            },
        })
    }
}
