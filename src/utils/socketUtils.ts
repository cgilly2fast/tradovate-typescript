import  MarketDataSocket from "../websockets/MarketDataSocket";
import ReplaySocket from "../websockets/ReplaySocket";
import TradovateSocket from "../websockets/TradovateSocket";
import { URLs } from '../config/credentials'
import { renewAccessToken } from "../endpoints/renewAccessToken";

const { DEMO_URL, LIVE_URL, MD_URL, WS_DEMO_URL, WS_LIVE_URL } = URLs

const socket = new TradovateSocket()
const mdSocket = new MarketDataSocket()
const replaySocket = new ReplaySocket()
let renewTokenInterval: NodeJS.Timer

const replaySessionResults: {[k:string |number]:any} = {}

export interface ConnectSocketsParams {
    live:boolean , 
    tvSocket:boolean ,             
    marketData:boolean , 
    replay:boolean 
}

export const connectSockets = async ( params: ConnectSocketsParams = {  live: false, 
                                                                        tvSocket: true,
                                                                        marketData: true, 
                                                                        replay: false}  ) => {

    let {live, tvSocket, marketData, replay} = params
    if(!tvSocket && !marketData && !replay) return Error('[DevX Trader]: No sockets marked as true in connectSockets()')                                                                        
    if(live === undefined) live = false

    const url = (live? WS_LIVE_URL:WS_DEMO_URL)

    try{
        await Promise.all([
            (tvSocket? socket.connect(url): null),
            (marketData? mdSocket.connect(MD_URL): null),
            (replay? replaySocket.connect(MD_URL): null)
        ])

        renewTokenInterval = setInterval(() => {
            renewAccessToken(live)
        }, 75*60*1000) 

    } catch(err) {
        console.log(err)
    }
}

export const connectAllSockets = async (live:boolean = false) =>  {
    const url = (live? WS_LIVE_URL:WS_DEMO_URL)
    try{
        await Promise.all([
            socket.connect(url),
            mdSocket.connect(MD_URL),
            replaySocket.connect(MD_URL)
        ])

        renewTokenInterval = setInterval(() => {
            renewAccessToken(live)
        }, 75*60*1000) 
    } catch(err) {
        console.log(err)
    }
}

export const disconnectSockets = async () => {
    try{
        await Promise.all([
            (socket.isConnected()? socket.disconnect(): null),
            (mdSocket.isConnected()?mdSocket.disconnect(): null),
            //(replaySocket.isConnected()? replaySocket.disconnect(): null)
        ])
        clearInterval(renewTokenInterval)
    } catch(err) {
        console.log(err)
    }
}

export const getSocket = () => socket

export const getMdSocket = () => mdSocket

export const getReplaySocket = () => replaySocket

export const getSessionResults = () => replaySessionResults
