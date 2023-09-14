import {
    Bar,
    Tick,
    TickPacket,
    BarPacket,
    BarsTransformer,
    TicksTransformer
} from '../types'
import {TickOrBar, TickOrBarPacket} from '../types'

/**
 * Represents a utility function to transform BarPacket data into an array of Bar objects.
 * @param packet - The BarPacket containing bars data.
 * @returns An array of Bar objects.
 */
export function barsTransformer(packet: BarPacket) {
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
/**
 * Represents a utility function to transform TickPacket data into an array of Tick objects.
 * @param packet - The TickPacket containing tick data.
 * @returns An array of Tick objects.
 */
export function ticksTransformer(packet: TickPacket) {
    const {id: subId, bp, bt, ts, tks} = packet
    const result: Tick[] = []
    if (tks) {
        tks.forEach(({t, p, s, b, a, bs, as: asks, id}) => {
            result.push({
                subscriptionId: subId,
                id,
                contractTickSize: ts,
                timestamp: new Date(bt + t).toISOString(),
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

export default class DataBuffer<T extends BarsTransformer | TicksTransformer> {
    public transformer: T
    public buffer: TickOrBar<T>[]
    public lastTs: number

    private maxLength: number | null

    /**
     * Initializes a new instance of the DataBuffer class.
     * @param transformer - The transformer function used to process data.
     * @param data - Initial data for the buffer.
     */
    constructor(transformer: T, data: TickOrBar<T>[] = []) {
        this.transformer = transformer
        this.buffer = data
        this.lastTs = 0
        this.maxLength = null
    }
    /**
     * Pushes new data into the buffer.
     * @param packet - The data packet to be processed and pushed into the buffer.
     */
    push(packet: TickOrBarPacket<T>) {
        let items = this.transformer(packet as TickPacket & BarPacket)

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

    /**
     * Sets the maximum length of the buffer.
     * @param max - The maximum length of the buffer.
     */
    setMaxLength = (max: number) => (this.maxLength = max)

    /**
     * Pushes a new item into the buffer without performing timestamp checks.
     * @param item - The item to be pushed into the buffer.
     */
    softPush = (item: TickOrBar<T>) => this.buffer.push(item)

    /**
     * Concatenates a data packet into the buffer.
     * @param item - The data packet to be concatenated into the buffer.
     * @returns The updated DataBuffer instance.
     */
    concat = (item: TickOrBarPacket<T>) => {
        this.push(item)
        return this
    }

    /**
     * Retrieves a slice of data from the buffer based on the specified period.
     * @param period - The number of items to retrieve from the end of the buffer. Use null to retrieve all items.
     * @returns An array of Tick or Bar items.
     */
    slicePeriod = (period: number) =>
        period === null
            ? this.buffer.slice()
            : this.buffer.slice(this.buffer.length - period)

    /**
     * Retrieves the data stored in the buffer.
     * @param i - Optional index to retrieve a specific item from the buffer.
     * @returns The entire buffer or a specific item from the buffer.
     */
    getData = (i = -1) => (i > -1 ? this.buffer[i] : this.buffer)

    /**
     * Iterates over each item in the buffer and executes the provided callback function.
     * @param callback - A callback function to execute for each item in the buffer.
     */
    forEach = (
        callback: (value: TickOrBar<T>, index: number, array: TickOrBar<T>[]) => void
    ) => this.buffer.forEach(callback)

    /**
     * Maps each item in the buffer to a new value using the provided callback function.
     * @typeparam U - The type of the mapped items.
     * @param callback - A callback function to map each item in the buffer.
     * @returns An array of mapped values.
     */
    map<U>(callback: (value: TickOrBar<T>, index: number, array: TickOrBar<T>[]) => U) {
        this.buffer.map(callback)
    }

    /**
     * Reduces the items in the buffer to a single value using the provided callback function.
     * @param callback - A callback function to execute on each item in the buffer.
     * @param seed - A value to use as the initial accumulator in the reduction.
     * @returns The final reduced value.
     */
    reduce = (callback: any, seed: any) => this.buffer.reduce(callback, seed)

    /**
     * Retrieves a slice of items from the buffer based on the specified start and end indices.
     * @param start - The starting index of the slice.
     * @param end - The ending index of the slice.
     * @returns An array of sliced items.
     */
    slice = (start: number, end: number): TickOrBar<T>[] => this.buffer.slice(start, end)

    /**
     * Finds the index of the specified item in the buffer.
     * @param item - The item to search for in the buffer.
     * @returns The index of the item or -1 if not found.
     */
    indexOf = (item: TickOrBar<T>) => this.buffer.indexOf(item)

    /**
     * Checks if every item in the buffer satisfies the provided predicate function.
     * @param predicate - A predicate function to test each item in the buffer.
     * @returns True if all items satisfy the predicate; otherwise, false.
     */
    every = (
        predicate: (value: TickOrBar<T>, index: number, array: TickOrBar<T>[]) => boolean
    ) => this.buffer.every(predicate)

    /**
     * Checks if every item in the buffer satisfies the provided predicate function.
     * @param predicate - A predicate function to test each item in the buffer.
     * @returns True if all items satisfy the predicate; otherwise, false.
     */
    filter = (
        predicate: (value: TickOrBar<T>, index: number, array: TickOrBar<T>[]) => boolean
    ) => this.buffer.filter(predicate)

    /**
     * Checks if at least one item in the buffer satisfies the provided predicate function.
     * @param predicate - A predicate function to test each item in the buffer.
     * @returns True if at least one item satisfies the predicate; otherwise, false.
     */
    some = (
        predicate: (value: TickOrBar<T>, index: number, array: TickOrBar<T>[]) => boolean
    ) => this.buffer.some(predicate)

    /**
     * Finds the first item in the buffer that satisfies the provided predicate function.
     * @param predicate - A predicate function to test each item in the buffer.
     * @returns The first item that satisfies the predicate, or undefined if not found.
     */
    find = (
        predicate: (value: TickOrBar<T>, index: number, array: TickOrBar<T>[]) => boolean
    ) => this.buffer.find(predicate)

    /**
     * Retrieves the last item in the buffer, or the item at the specified position from the end.
     * @param i - Optional position from the end to retrieve the item.
     * @returns The last item in the buffer or the item at the specified position.
     */
    last = (i: number = 0) => this.buffer[this.buffer.length - (1 + i)]

    /**
     * Retrieves the number of items currently stored in the buffer.
     * @returns The number of items in the buffer.
     */
    length = (): number => this.buffer.length
}
