import {Bar, Tick, TickPacket, BarPacket} from '../types'

export interface DataTransformer {
    transform(packet: TickPacket | BarPacket): any[]
}
export class BarsTransformer implements DataTransformer {
    transform(packet: BarPacket) {
        const {bars} = packet
        const results: Bar[] = []
        if (bars) {
            bars.forEach((bar: Bar) => {
                const result = bar
                results.push(result)
            })
        }
        return results
    }
}
export class TicksTransformer implements DataTransformer {
    transform(packet: TickPacket) {
        const {id: subId, bp, bt, ts, tks} = packet
        const result: Tick[] = []
        if (tks) {
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
}
export type TickOrBar<T extends BarsTransformer | TicksTransformer> =
    T extends TicksTransformer ? Tick : T extends BarsTransformer ? Bar : never

export type TickOrBarPacket<T extends BarsTransformer | TicksTransformer> =
    T extends TicksTransformer
        ? TickPacket
        : T extends BarsTransformer
        ? BarPacket
        : never
export default class DataBuffer<T extends TicksTransformer & BarsTransformer> {
    public transformer: T
    public buffer: TickOrBar<T>[]
    public lastTs: number

    private maxLength: number | null

    constructor(transformer: T, data: TickOrBar<T>[] = []) {
        this.transformer = transformer
        this.buffer = data
        this.lastTs = 0
        this.maxLength = null
    }

    push(packet: TickOrBarPacket<T>) {
        let items = this.transformer.transform(packet)

        items = items.sort(
            (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        )

        items.forEach(tick => {
            const timestamp = new Date(tick.timestamp).getTime()
            if (this.buffer.length === 0 || timestamp > this.lastTs) {
                this.buffer.push(tick as TickOrBar<T>)
                if (this.maxLength && this.buffer.length > this.maxLength) {
                    this.buffer.shift()
                }
                this.lastTs = timestamp
            } else if (timestamp === this.lastTs) {
                this.buffer[this.buffer.length - 1] = {...tick} as TickOrBar<T>
            }
        })
    }

    setMaxLength = (max: number) => (this.maxLength = max)

    softPush = (item: TickOrBar<T>) => this.buffer.push(item)

    concat = (item: TickOrBarPacket<T>) => {
        this.push(item)
        return this
    }

    slicePeriod = (period: number) =>
        period === null
            ? this.buffer.slice()
            : this.buffer.slice(this.buffer.length - period)

    getData = (i = -1) => (i > -1 ? this.buffer[i] : this.buffer)

    forEach = (callback: any) => this.buffer.forEach(callback)

    map = (callback: any) => this.buffer.map(callback)

    reduce = (callback: any, seed: any) => this.buffer.reduce(callback, seed)

    slice = (start: number, end: number) => this.buffer.slice(start, end)

    indexOf = (item: TickOrBar<T>) => this.buffer.indexOf(item)

    every = (predicate: any) => this.buffer.every(predicate)

    filter = (predicate: any) => this.buffer.filter(predicate)

    some = (predicate: any) => this.buffer.some(predicate)

    find = (predicate: any) => this.buffer.find(predicate)

    last = (i = 0) => this.buffer[this.buffer.length - (1 + i)]

    length = (): number => this.buffer.length
}
