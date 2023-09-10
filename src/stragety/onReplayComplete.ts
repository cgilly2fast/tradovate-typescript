import {getReplaySocket} from '../utils/socketUtils'
import {Action, Item, Dictionary} from '../types'

export const replayComplete = (state: Dictionary, action: Action) => {
    const {event, payload} = action

    if (event === 'replay/replayComplete') {
        console.log('[IN REPLAY COMPLETE]')
        const {props} = payload
        const {dispatcher} = props
        const {position} = state

        const socket = getReplaySocket()

        const results: any = {
            finalPos: position?.netPos || 0,
            bought: position?.bought || 0,
            sold: position?.sold || 0
        }

        socket.request({
            url: 'fillPair/list',
            onResponse: (id: number, item: Item) => {
                if (id === item.i) {
                    results.fillPairs = item.d
                    console.log('[DISPATCHING SHOW STATS]')
                    dispatcher.dispatch('replay/showStats', {
                        data: results,
                        props
                    })
                }
            }
        })
    }

    return action
}
