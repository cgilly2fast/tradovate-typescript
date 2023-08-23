import { calculatePnL } from '../utils/pnl'
import { getReplaySocket, getSessionResults } from '../utils/socketUtils'
import { Action, Dictionary } from '../utils/types'

export const drawReplayStats = (state: Dictionary, action: Action): Action => {
    const { event, payload } = action
    const { data, props } = payload

    if (event === 'replay/showStats') {
        const { position, product, buffer, realizedPnL } = state
        const { finalPos, bought, sold, fillPairs } = data
        const { contract, dispatcher } = props

        dispatcher.dispatch('stop', {})
    }

    return action
}
