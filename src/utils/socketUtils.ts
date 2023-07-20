import  MarketDataSocket from "../websockets/MarketDataSocket";
import ReplaySocket from "../websockets/ReplaySocket";
import TradovateSocket from "../websockets/TradovateSocket";
import { URLs } from '../config/credentials'

const { DEMO_URL, LIVE_URL, MD_URL, WS_DEMO_URL, WS_LIVE_URL } = URLs

const socket = new TradovateSocket()
const mdSocket = new MarketDataSocket()
const replaySocket = new ReplaySocket()

const replaySessionResults: {[k:string |number]:any} = {}

export const connectSockets = (live:boolean = false) =>  {
    const url = (live? WS_LIVE_URL:WS_DEMO_URL)
    try{
        Promise.all([
            socket.connect(url),
            mdSocket.connect(MD_URL),
            replaySocket.connect(MD_URL)
        ])
    } catch(err) {
        console.log(err)
    }
}

export const disconnectSockets = () => {
    try{
        Promise.all([
            socket.disconnect(),
            mdSocket.disconnect(),
            replaySocket.disconnect()
        ])
    } catch(err) {
        console.log(err)
    }
}

export const getSocket = () => socket

export const getMdSocket = () => mdSocket

export const getReplaySocket = () => replaySocket

export const getSessionResults = () => replaySessionResults