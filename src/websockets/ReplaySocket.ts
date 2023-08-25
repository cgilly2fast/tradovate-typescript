import {
    ResponseMessage,
    ServerEvent,
    isResponseMessage,
    isServerEvent,
    EndpointResponseMap,
} from '../utils/types'
import MarketDataSocket from './MarketDataSocket'

export type ReplaySocketCheckReplaySessionParams<
    T extends keyof EndpointResponseMap<T>,
> = {
    startTimestamp: string
    callback: (item: ResponseMessage<T>) => void
}

export type ReplaySocketInitializeClockParams<
    T extends keyof EndpointResponseMap<T>,
> = {
    speed?: number
    initialBalance?: number
    startTimestamp: string
    callback: (item?: ServerEvent<T>) => void
}

export default class ReplaySocket extends MarketDataSocket {
    constructor() {
        super()
    }

    checkReplaySession(
        params: ReplaySocketCheckReplaySessionParams<'replay/checkreplaysession'>,
    ) {
        const { startTimestamp, callback } = params
        return this.request({
            url: 'replay/checkreplaysession',
            body: { startTimestamp },
            onResponse: (id, item) => {
                if (item.i === id) {
                    callback(item)
                }
            },
        })
    }

    initializeClock(
        params: ReplaySocketInitializeClockParams<'replay/initializeclock'>,
    ) {
        const { callback, startTimestamp, speed, initialBalance } = params

        return this.subscribe({
            url: 'replay/initializeclock',
            body: {
                startTimestamp,
                speed: speed ?? 400,
                initialBalance: initialBalance ?? 50000,
            },
            onResponse: (id, item) => {
                if (isServerEvent(item) && item.e === 'clock') {
                    callback(item)
                }
            },
            disposer: () => {},
        })
    }
}
