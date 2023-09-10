import {getReplaySocket} from '../utils/socketUtils'
import {setAvailableAccounts} from '../utils/storage'
import {
    Action,
    Payload,
    StrategyState,
    ReplayPeriod,
    StrategyParams
} from '../utils/types'
import Dispatcher from '../utils/dispatcher'
import {stringify} from '../utils/stringify'
import {log} from 'console'

export const nextReplayPeriod = (state: StrategyState, action: Action): Action => {
    const {event, payload} = action
    const {props} = payload

    if (event === 'replay/nextReplayPeriod') {
        log('[DevX Trader}: Go to next replay')
        const {dispatcher, replayPeriods} = props
        const {current_period} = state

        if (current_period === undefined)
            throw new Error('nextReplayPeriod: current_period for replay is undefined')

        if (current_period === replayPeriods.length) {
            log('[Tradovate]: Dispatched replay complete]')
            dispatcher.dispatch('replay/replayComplete', payload)
            return action
        }

        startNextReplayPeriod(props, replayPeriods, current_period, dispatcher, payload)

        return action
    }
    return action
}

async function startNextReplayPeriod(
    props: StrategyParams,
    replayPeriods: ReplayPeriod[],
    current_period: number,
    dispatcher: Dispatcher,
    payload: Payload
) {
    log('[Tradovate]: Moving to next replay period..')

    const replaySocket = getReplaySocket()

    try {
        await replaySocket.connect()

        try {
            replaySocket.removeListeners()
        } catch (e) {
            log('socket remove', e)
        }
        try {
            log('[Tradovate]: Checking new replay period...')
            await replaySocket.checkReplaySession(replayPeriods[current_period].start)
        } catch (err) {
            log(
                '[Tradovate]: Could not initialize replay session. Check that your replay periods are within a valid time frame and that you have Market Replay access.'
            )
            throw err
        }

        log('[Tradovate]: Valid replay period.')
        log('[Tradovate]: Initializing new replay clock...')
        await replaySocket.initializeClock(
            replayPeriods[current_period].start,
            props.replaySpeed as number,
            undefined,
            item => {
                if (item.e === 'clock' && item.d.length < 40) {
                    log('current speed', item)
                    try {
                        replaySocket.request({
                            url: 'replay/changespeed',
                            body: {speed: (props.replaySpeed as number) ?? 400}
                        })

                        log(
                            `[Tradovate]: Replay socket speed restored to ${props.replaySpeed}`
                        )
                    } catch (err) {
                        log(
                            `[Tradovate]: Error Replay socket speed restoration ${stringify(
                                item
                            )}`
                        )
                        log(err)
                    }
                }
            }
        )
        log('[Tradovate]: Initializing clock complete.')
        const accountRes = await replaySocket.request({
            url: 'account/list'
        })

        const account = accountRes.d.find(account => account.active)
        log(`[Tradovate]: account: ${stringify(account)}`)

        setAvailableAccounts([account!])

        dispatcher.dispatch('replay/resetEventHandlers', payload)
        log('[Tradovate]: Transition to next replay period complete.')
    } catch (err) {
        log(`[Tradovate]: startNextReplayPeriod Error: ${err}`)
    }
}
