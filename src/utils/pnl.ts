import {CalculatePnLParams} from '../types'
/**
 * Calculates the Profit and Loss (PnL) based on the given parameters.
 *
 * @param params - The parameters required for PnL calculation.
 * @returns The calculated PnL value.
 *
 * @example
 * // Example usage:
 * const params: CalculatePnLParams = {
 *   price: 100, // Current price
 *   position: {
 *     accountId: 123,
 *     contractId: 456,
 *     timestamp: '2023-09-13T12:00:00Z',
 *     tradeDate: '2023-09-13',
 *     netPos: 10,
 *     netPrice: 95, // Buy price
 *     bought: 10,
 *     boughtValue: 950,
 *     sold: 0,
 *     soldValue: 0,
 *     prevPos: 0,
 *     prevPrice: 0,
 *   },
 *   product: {
 *     name: 'Product ABC',
 *     currencyId: 1,
 *     productType: ProductType.Futures,
 *     description: 'Description of Product ABC',
 *     exchangeId: 789,
 *     contractGroupId: 123,
 *     riskDiscountContractGroupIda: 456,
 *     status: ProductStatus.Verified,
 *     months: 'F,G,H,J,K,M,N,Q,U,V,X,Z',
 *     isSecured: true,
 *     valuePerPoint: 10, // Value per point (PnL factor)
 *     priceFormatType: PriceFormatType.Decimal,
 *     priceFormat: 2, // Number of decimal places
 *     tickSize: 0.25, // Tick size
 *   },
 * };
 *
 * const pnl = calculatePnL(params);
 * console.log(`Profit and Loss: $${pnl}`);
 */
export function calculatePnL(params: CalculatePnLParams): number {
    const {price, position, product} = params
    if (!position || !product || !price) return 0

    const vpp = product?.valuePerPoint
    const buy = position?.netPrice || position?.prevPrice

    return (price - buy!) * vpp! * (position.netPos || position.prevPos || 0)
}
