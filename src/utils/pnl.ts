export interface CalculatePnLParams {
    price: number, 
    position:any, 
    product:any
}

export function calculatePnL(params:CalculatePnLParams) {
    const {price, position, product} = params
    if(!position || !product || !price) return 0

    let vpp = product?.valuePerPoint 

    let buy = position?.netPrice || position?.prevPrice

    return (price - buy) * vpp * (position.netPos || position.prevPos || 0)    
}