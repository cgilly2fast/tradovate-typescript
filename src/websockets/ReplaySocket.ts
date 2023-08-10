import MarketDataSocket from "./MarketDataSocket"

export interface ReplaySocketCheckReplaySessionParams {
    startTimestamp:any, 
    callback:any
}

export interface ReplaySocketInitializeClockParams extends ReplaySocketCheckReplaySessionParams {
    speed?: number
    initialBalance?: number
}

export default class ReplaySocket extends MarketDataSocket {
    constructor() {
        super()
    }

    checkReplaySession(params:ReplaySocketCheckReplaySessionParams) {
        const {startTimestamp, callback} = params
        return this.request({
            url: 'replay/checkreplaysession',
            body: { startTimestamp },
            onResponse: (id, item) => {
                if(item.i === id) {
                    callback(item.d)
                }
            }
        })
    }

    initializeClock(params: ReplaySocketInitializeClockParams) {
        let {startTimestamp, callback, speed, initialBalance} = params

        speed = (speed === undefined? 400: speed)
        initialBalance = (initialBalance === undefined? 50000:initialBalance )
        
        return this.request({
            url: 'replay/initializeclock',
            body: { startTimestamp, speed, initialBalance },
            onResponse: (id, item) => {
                
                if(id === item.i && item.s === 200) {
                    callback()
                }
                else if(item.e && item.e === 'clock') {
                    callback(item.d)
                }
            },
        })
    }
}