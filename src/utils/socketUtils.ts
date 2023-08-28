import MarketDataSocket from '../websockets/MarketDataSocket'
import ReplaySocket from '../websockets/ReplaySocket'
import TradovateSocket from '../websockets/TradovateSocket'
import {renewAccessToken} from '../endpoints/renewAccessToken'
import {ReplaySessionResults, URLs} from './types'

//need to deal with live condition
const socket = new TradovateSocket()
const mdSocket = new MarketDataSocket()
const replaySocket = new ReplaySocket()
let renewTokenInterval: NodeJS.Timer

const replaySessionResults: ReplaySessionResults[] = []
export type ConnectSocketsParams = {
    live: boolean
    tvSocket: boolean
    marketData: boolean
    replay: boolean
}

export const connectSockets = async (replay: boolean, live: boolean = false) => {
    try {
        if (replay) {
            await replaySocket.connect()
        } else {
            await Promise.all([socket.connect(), mdSocket.connect()])

            renewTokenInterval = setInterval(() => {
                renewAccessToken(live)
            }, 75 * 60 * 1000)
        }
    } catch (err) {
        console.log(`[DevX Trader]: connectSockets: ${err}`)
        throw err
    }
}

export const connectAllSockets = async (live: boolean = false) => {
    try {
        await Promise.all([socket.connect(), mdSocket.connect(), replaySocket.connect()])

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
            socket.isConnected() ? socket.disconnect() : null
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
