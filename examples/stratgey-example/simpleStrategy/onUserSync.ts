import {
    Contract,
    LongShortMode,
    UserSyncPayload,
    EventHandlerResults
} from '../../../../tradovate-typescript/dist'
import {SimpleStrategyState} from './'

export function onUserSync(
    prevState: SimpleStrategyState,
    payload: UserSyncPayload,
    contract: Contract
): EventHandlerResults<SimpleStrategyState> {
    const {positions, products, cashBalances} = payload

    const product = products
        ? products.find((p: any) => contract.name.startsWith(p.name))
        : undefined
    const position = positions
        ? positions.find((pos: any) => pos.contractId === contract.id)
        : undefined
    const realizedPnl = cashBalances ? cashBalances[0].realizedPnl! : 0

    return {
        state: {
            ...prevState,
            mode:
                position && position.netPos > 0
                    ? LongShortMode.Long
                    : position && position.netPos < 0
                    ? LongShortMode.Short
                    : /*else*/ LongShortMode.Watch,
            product,
            position,
            realizedPnl
        },
        actions: []
    }
}
