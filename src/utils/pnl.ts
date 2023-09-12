import {Position, Product} from '../types'

/**
 * Represents the parameters required to calculate Profit and Loss (PnL).
 */
export type CalculatePnLParams = {
    /** The current price of the product. */
    price: number
    position: Position
    product: Product
}

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
