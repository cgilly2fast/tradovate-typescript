import {
    Action,
    CustomActionTemplate,
    Dictionary,
    EndpointURLs,
    EventHandlerResults,
    RequestAction,
    StrategyState
} from './types'

export const deepCopy = (o: any) => {
    let r: any
    if (o === null) return null
    else if (Array.isArray(o) || typeof o === 'string') {
        r = o.slice()
    } else if (typeof o === 'object') {
        r = {}
        Object.keys(o).forEach(k => (r[k] = deepCopy(o[k])))
    } else {
        r = o
    }
    return r
}

export const pipeMiddleware =
    (...fns: any) =>
    (model: Dictionary, action: Action) => {
        let result = action
        fns.forEach((fn: any) => {
            result = fn(model, result)
        })
        return result
    }

/**
 * @template T
 * @typedef {[k: string, data: T]} Action
 */

/**
 * @template T
 * @typedef {{ id: string, state: () => any, dispatch: (action: string, data: unknown) => void}} Store
 */
export type Store = {
    id?: string
    state: () => any
    effects: any
    dispatch: (action: string, data: any) => void
}

export type DispatcherParams<T extends StrategyState, U extends string, V> = {
    id?: string
    model: T
    reducer: (
        prevState: T,
        action: Action | CustomActionTemplate<U, V>
    ) => EventHandlerResults<T>
}

export default class Dispatcher<T extends StrategyState> {
    public id?: string
    private model: T
    private reducer: (
        prevState: T,
        action: Action | CustomActionTemplate<string, any>
    ) => EventHandlerResults<T>
    private storeState: T
    private storeActions: Action[]
    private dispatching: boolean
    private queue: (Action | CustomActionTemplate<string, any>)[]

    constructor(params: DispatcherParams<T, string, any>) {
        const {id, model, reducer} = params
        this.id = id
        this.model = model
        this.reducer = reducer
        this.storeState = deepCopy(this.model)
        this.storeActions = []
        this.queue = []
        this.dispatching = false
    }

    state() {
        return this.storeState
    }
    actions() {
        return this.storeActions
    }

    dispatch(action: Action | CustomActionTemplate<string, any>) {
        if (this.dispatching) {
            this.queue.push(action)
            return
        }
        this.dispatching = true

        if (this.reducer) {
            const next = this.reducer(this.storeState, action)
            this.storeState = next.state
            this.storeActions = next.actions
        }
        // This needs to be cleaned up
        while (this.queue.length > 0) {
            const a = this.queue.shift()

            if (this.reducer && a !== undefined) {
                const next = this.reducer(this.storeState, a)
                this.storeState = next.state
                this.storeActions = next.actions
            }
        }
        this.dispatching = false
    }
}
