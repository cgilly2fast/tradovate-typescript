// import { DEMO_URL } from './credentials'
import {getAccessToken, getCurrentAccount} from '../utils/storage'
import {tvPost} from '../utils/service'

export type OrderParams = {
    accountSpec?: string
    accountId?: number
    clOrdId?: string
    action: string //required
    symbol: string | number //required
    orderQty: number //required
    orderType: string //required
    price?: number
    stopPrice?: number
    maxShow?: number
    pegDifference?: number
    timeInForce?: string
    expireTime?: string
    text?: string
    activationTime?: string
    customTag50?: string
    isAutomated?: boolean
}

export const placeOrder = async (params: OrderParams) => {
    const {id, name} = getCurrentAccount()
    const {token} = getAccessToken()
    const {action, symbol, orderQty, orderType, isAutomated} = params

    const normalized_body = {
        action,
        symbol,
        orderQty,
        orderType,
        isAutomated: isAutomated !== undefined ? isAutomated : true,
        accountId: id,
        accountSpec: name
    }

    if (!token) {
        console.error(
            '[DevX Trader]: No access token found. Please acquire a token and try again.'
        )
        return
    }
    let res
    try {
        res = await tvPost('/order/placeOrder', normalized_body)
    } catch (err) {
        console.log('[DevX Trade]: ' + err)
        return err
    }
    return res
}