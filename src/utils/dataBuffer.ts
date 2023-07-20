import { Bar, Tick, TickPacket, BarPacket } from "./types"

export function BarsTransformer(response:BarPacket):Bar[] {
    const {bars} = response
    let results: Bar[] = []
    if(bars) {
        bars.forEach((bar:Bar) => {
            let result = bar
            results.push(result)
        })
    }
    // console.log('BAR XFORM RESULT')
    // console.log(results)
    return results
}



export function TicksTransformer(response:TickPacket):Tick[] {
    const {id: subId, bp, bt, ts, tks} = response
    let result:Tick[] = []
    if(tks) { 
        tks.forEach(({t, p, s, b, a, bs, as: asks, id}) => {
            result.push({
                subscriptionId: subId,
                id,
                contractTickSize: ts,
                timestamp: new Date(bt + t),
                price: (bp + p) * ts,
                volume: s,
                bidPrice: bs && (bp + b) * ts,
                bidSize: bs,
                askPrice: asks && (bp + a) * ts,
                askSize: asks
            })
        })
    }
    return result
}

export default class DataBuffer{
    public transformer: any // BarsTransformer | TicksTransformer
    public buffer: any[] //Bar[] |Tick[]
    public lastTs: any
    
    private maxLength: number | null

    constructor(transformer:any = null, data:any[] = []){
        this.transformer = transformer;
        this.buffer = [...data]
        this.lastTs = 0
        this.maxLength = null
    }

    push = (tick:BarPacket[] |TickPacket[]) => {
        let results
        if(this.transformer && typeof this.transformer === 'function') {
            results = this.transformer(tick)
        } else {
            results = tick
        }

        results = results.sort((a:any, b:any) => a.timestamp - b.timestamp)
        
        results.forEach((result:any) => {
            if(this.buffer.length === 0 || result.timestamp > this.lastTs) {
                this.buffer.push(result)
                if(this.maxLength && this.buffer.length > this.maxLength) {
                    this.buffer.shift()
                }
                this.lastTs = result.timestamp
            } else if(result.timestamp === this.lastTs) {
                this.buffer[this.buffer.length-1] = {...result}
            }
        })
    }

    setMaxLength= (max:number) => this.maxLength = max

    softPush = (item:any) => this.buffer.push(item)
        
    concat = (tick:any) => {
        this.push(tick)
        return this
    }

    slicePeriod = (period:any) => period === null ? this.buffer.slice() : this.buffer.slice(this.buffer.length - (period))

    getData    = (i = -1) => i > -1 ? this.buffer[i] : this.buffer

    forEach    = (callback:any) => this.buffer.forEach(callback)

    map        = (callback: any) => this.buffer.map(callback)

    reduce     = (callback:any, seed:any) => this.buffer.reduce(callback, seed)

    slice      = (start:any, end:any) => this.buffer.slice(start, end)

    indexOf    = (item:any) => this.buffer.indexOf(item)

    every      = (predicate:any) => this.buffer.every(predicate)

    filter     = (predicate:any) => this.buffer.filter(predicate)

    some       = (predicate:any) => this.buffer.some(predicate)

    find       = (predicate:any) => this.buffer.find(predicate)

    last       = (i = 0) => this.buffer[this.buffer.length - (1+i)]

    length     = ():number => this.buffer.length


}



