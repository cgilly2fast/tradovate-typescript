import {ProductStatus, PriceFormatType, ProductType} from '../src/types'
import {calculatePnL} from '../src/utils/pnl' // Import your utility function

// Define mock data for testing
const mockParams = {
    price: 100, // Current price
    position: {
        accountId: 123,
        contractId: 456,
        timestamp: '2023-09-13T12:00:00Z',
        tradeDate: '2023-09-13',
        netPos: 10,
        netPrice: 95, // Buy price
        bought: 10,
        boughtValue: 950,
        sold: 0,
        soldValue: 0,
        prevPos: 0,
        prevPrice: 0
    },
    product: {
        name: 'Product ABC',
        currencyId: 1,
        productType: ProductType.Futures,
        description: 'Description of Product ABC',
        exchangeId: 789,
        contractGroupId: 123,
        riskDiscountContractGroupIda: 456,
        status: ProductStatus.Verified,
        months: 'F,G,H,J,K,M,N,Q,U,V,X,Z',
        isSecured: true,
        valuePerPoint: 10, // Value per point (PnL factor)
        priceFormatType: PriceFormatType.Decimal,
        priceFormat: 2, // Number of decimal places
        tickSize: 0.25 // Tick size
    }
}

describe('calculatePnL Function Tests', () => {
    it('should calculate the Profit and Loss (PnL) correctly', () => {
        const pnl = calculatePnL(mockParams)

        // Calculate expected PnL based on the provided data
        const expectedPnL =
            (mockParams.price - mockParams.position.netPrice!) *
            mockParams.product.valuePerPoint! *
            mockParams.position.netPos

        expect(pnl).toBe(expectedPnL)
    })

    it('should return 0 if any required parameter is missing', () => {
        const incompleteParams = {
            price: 100, // Current price
            position: undefined, // Missing position
            product: {
                // Product details
            }
        }
        //@ts-ignore
        const pnl = calculatePnL(incompleteParams)

        expect(pnl).toBe(0)
    })
})
