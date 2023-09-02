import {getReplaySocket, getSocket} from '../utils/socketUtils'
import {getCurrentAccount} from '../utils/storage'
import {stringify} from '../utils/stringify'
import {
    Action,
    Contract,
    Dictionary,
    EntryVersion,
    OrderAction,
    OrderBracket,
    Socket,
    StartOrderStrategyEffectParams,
    StartOrderStrategyRequestBody,
    TvSocket
} from '../utils/types'
import ReplaySocket from '../websockets/ReplaySocket'
import TradovateSocket from '../websockets/TradovateSocket'

export const startOrderStrategy = (state: Dictionary, action: Action): Action => {
    const {event, payload} = action

    if (event === 'orderStrategy/startOrderStrategy') {
        const {data, props} = payload
        const {contract, action, brackets, entryVersion} =
            data as StartOrderStrategyEffectParams
        const {replayMode} = props
        const socket = replayMode ? getReplaySocket() : getSocket()

        const orderData = {
            entryVersion,
            brackets
        }

        const {id, name} = getCurrentAccount()

        const body: StartOrderStrategyRequestBody = {
            accountId: id,
            accountSpec: name,
            symbol: contract.name,
            action,
            orderStrategyTypeId: 2,
            params: JSON.stringify(orderData)
        }

        sendStartOrderStrategy(socket, body)
    }

    return action
}

async function sendStartOrderStrategy(
    socket: TradovateSocket | ReplaySocket,
    body: StartOrderStrategyRequestBody
) {
    try {
        const response = await socket.request({
            url: 'orderStrategy/startOrderStrategy',
            body
        })
        console.log(
            `[DevX Trader]: New Order Strategy: Status: ${response.s} Action: ${response.d.orderStrategy.action} Id: ${response.d.orderStrategy.id}`
        )
    } catch (err) {
        console.log(
            `[DevX Trader]: New Order Strategy Error: ${err} Body params: ${stringify(
                body
            )}`
        )
    }
}
