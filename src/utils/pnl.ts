import {CalculatePnLParams} from '../types'
/**
 * Calculates the Profit and Loss (PnL) based on the given parameters.
 * @param params - The parameters required for PnL calculation.
 * @returns The calculated PnL value.
 */
export function calculatePnL(params: CalculatePnLParams): number {
    const {price, position, product} = params
    if (!position || !product || !price) return 0

    const vpp = product?.valuePerPoint
    const buy = position?.netPrice || position?.prevPrice

    return (price - buy!) * vpp! * (position.netPos || position.prevPos || 0)
}
