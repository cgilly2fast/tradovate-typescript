import MarketDataSocket from '../websockets/MarketDataSocket'
import ReplaySocket from '../websockets/ReplaySocket'
import TradovateSocket from '../websockets/TradovateSocket'
import { URLs } from '../config/tvCredentials'
import { renewAccessToken } from '../endpoints/renewAccessToken'
import { ReplaySessionResults } from './types'

const { MD_URL, WS_DEMO_URL, WS_LIVE_URL, REPLAY_URL } = URLs

const socket = new TradovateSocket()
const mdSocket = new MarketDataSocket()
const replaySocket = new ReplaySocket()
let renewTokenInterval: NodeJS.Timer

const replaySessionResults: ReplaySessionResults[] = []
export interface ConnectSocketsParams {
    live: boolean
    tvSocket: boolean
    marketData: boolean
    replay: boolean
}

export const connectSockets = async (
    params: ConnectSocketsParams = {
        live: false,
        tvSocket: true,
        marketData: true,
        replay: false,
    },
) => {
    const { live, tvSocket, marketData, replay } = params
    if (live === undefined) {
        return Error('[DevX Trader]: live not specified in connectSockets()')
    }
    if (!tvSocket && !marketData && !replay)
        return Error(
            '[DevX Trader]: No sockets marked as true in connectSockets()',
        )

    const url = live ? WS_LIVE_URL : WS_DEMO_URL

    try {
        await Promise.all([
            tvSocket ? socket.connect(url) : null,
            marketData ? mdSocket.connect(MD_URL) : null,
            replay ? replaySocket.connect(REPLAY_URL) : null,
        ])

        if (!replay) {
            renewTokenInterval = setInterval(() => {
                renewAccessToken(live)
            }, 75 * 60 * 1000)
        }
    } catch (err) {
        console.log(err)
    }
}

export const connectAllSockets = async (live: boolean = false) => {
    const url = live ? WS_LIVE_URL : WS_DEMO_URL
    try {
        await Promise.all([
            socket.connect(url),
            mdSocket.connect(MD_URL),
            replaySocket.connect(MD_URL),
        ])

        renewTokenInterval = setInterval(() => {
            renewAccessToken(live)
        }, 75 * 60 * 1000)
    } catch (err) {
        console.log(err)
    }
}

export const disconnectSockets = async () => {
    try {
        await Promise.all([
            mdSocket.isConnected() ? mdSocket.disconnect() : null,
            socket.isConnected() ? socket.disconnect() : null,
        ])
        clearInterval(renewTokenInterval)
    } catch (err) {
        console.log(err)
    }
    console.log('[DevX Trader]: Stopped')
}

export const disconnectReplaySocket = async () => {
    try {
        replaySocket.isConnected() ? await replaySocket.disconnect() : null,
            clearInterval(renewTokenInterval)
    } catch (err) {
        console.log(err)
    }
    console.log('[DevX Trader]: Stopped')
}

export const getSocket = () => socket

export const getMdSocket = () => mdSocket

export const getReplaySocket = () => replaySocket

export const getSessionResults = () => replaySessionResults
