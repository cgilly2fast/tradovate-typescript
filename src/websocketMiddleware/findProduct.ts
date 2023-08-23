import { getReplaySocket, getSocket } from '../utils/socketUtils'
import { Action, Dictionary } from '../utils/types'

export const productFind = (state: Dictionary, action: Action): Action => {
    const { event, payload } = action

    if (event === 'product/find') {
        const { data, props } = payload
        const { devMode, dispatcher } = props
        const { name } = data

        const socket = devMode ? getReplaySocket() : getSocket()

        socket.request({
            url: 'product/find',
            query: `name=${name}`,
            onResponse: (id, r) => {
                if (r.i === id) {
                    //console.log("[DevX Trader]: Product Found: " + JSON.stringify(r))
                    dispatcher.dispatch('product/found', {
                        data: { entity: r.d },
                        props,
                    })
                }
            },
        })
    }

    return action
}
