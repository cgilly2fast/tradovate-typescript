import { calculatePnL } from '../utils/pnl'
import { getReplaySocket, getSessionResults } from '../utils/socketUtils'
import { setAvailableAccounts } from '../utils/storage'
import {
    Action,
    Payload,
    StrategyState,
    isResponseMsg,
    isServerEvent,
    ServerEvent,
    URLs,
    ReplayPeriod,
    StrategyParams
} from '../utils/types'
import Dispatcher from '../utils/dispatcher'
import { stringify } from '../utils/stringify'
import {log} from 'console'
const { REPLAY_URL } = URLs

export const nextReplayPeriod = (state: StrategyState, action: Action): Action => {
    const { event, payload } = action
    const { props } = payload

    if (event === 'replay/nextReplayPeriod') {
        log('[DevX Trader}: Go to next replay')
        const { dispatcher, replayPeriods } = props
        const {current_period} = state

        if(current_period === undefined) 
            throw new Error('nextReplayPeriod: current_period for replay is undefined')


        if (current_period === replayPeriods.length) {
            log('[DevX Trader]: Dispatched replay complete]')
            dispatcher.dispatch('replay/replayComplete', payload)
            return action
        } 

        startNextReplayPeriod(
            props,
            replayPeriods,
            current_period,
            dispatcher,
            payload )

        return action
        
    }
    return action
}

async function startNextReplayPeriod(
    props: StrategyParams,
    replayPeriods: ReplayPeriod[],
    current_period: number,
    dispatcher: Dispatcher,
    payload: Payload,
) {
    log('[DevX Trader]: Moving to next replay period..')

    const replaySocket = getReplaySocket()

    try {
        await replaySocket.connect()

        try {
            replaySocket.removeListeners()
        } catch (e) {
            log('socket remove', e)
        }
        try{
            log('[DevX Trader]: Checking new replay period...')
            await replaySocket.checkReplaySession(
                replayPeriods[current_period].start,
            )
        } catch(err) {
            log('[DevX Trader]: Could not initialize replay session. Check that your replay periods are within a valid time frame and that you have Market Replay access.')
            throw err
        }

        log('[DevX Trader]: Valid replay period.')
        log('[DevX Trader]: Initializing new replay clock...')
        await replaySocket.initializeClock(
            replayPeriods[current_period].start,
            props.replaySpeed as number,
            undefined,
            (item) => {
                if (
                    item.e === 'clock' &&
                    item.d.length < 40
                ) {
                    log('current speed', item)
                    try {
                        const speedRes = replaySocket.request({
                            url: 'replay/changespeed',
                            body: { speed: props.replaySpeed as number ?? 400 }
                        })

                        log(`[DevX Trader]: Replay socket speed restored to ${props.replaySpeed}`)
                    } catch (err) {
                        log(`[DevX Trader]: Error Replay socket speed restoration ${stringify(item)}`)
                        log(err) 
                    }
                }
            })
        log('[DevX Trader]: Initializing clock complete.')
        const accountRes = await replaySocket.request({
            url: 'account/list'
        })
        
        const account = accountRes.d.find(account => account.active)
        log(`[DevX Trader]: account: ${stringify(account)}`)

        setAvailableAccounts([account!])

        dispatcher.dispatch('replay/resetEventHandlers', payload)
        log('[DevX Trader]: Transition to next replay period complete.')

    } catch (err) {
        log(`[DevX Trader]: startNextReplayPeriod Error: ${err}`)
    }
}
