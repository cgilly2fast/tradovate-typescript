import {Action, Dictionary} from './types'

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

export type DispatcherParams = {
    id?: string
    model?: any
    reducer?: any
    mw?: (model: any, action: Action) => Action
}
/**
 * @template T
 * @template A
 * @template B
 * @param {{
 *  id: string
 *  model: T
 *  reducer: (model: T, action: Action<A>) => T
 *  mw: (model: T, action: Action<A>) => Action<B>
 * }} param0
 * @returns {Store<T>}
 */
export default class Dispatcher {
    public id?: string
    private model: any
    private reducer: any
    private storeState: any
    private storeActions: Action[]
    private dispatching: boolean
    private queue: Action[]

    constructor(params: DispatcherParams) {
        const {id, model, reducer, mw} = params
        this.id = id
        this.model = model
        this.reducer = reducer
        this.storeState = deepCopy(this.model)
        ;(this.storeActions = []), (this.queue = [])
        this.dispatching = false
    }

    state() {
        return this.storeState
    }
    actions() {
        return this.storeActions
    }

    dispatch(action: Action) {
        if (this.dispatching) {
            this.queue.push(action)
            return
        }
        this.dispatching = true

        if (this.reducer) {
            const next = this.reducer(this.storeState, action)
            this.storeState = next.state
            this.storeActions = next.effects
        }
        // This needs to be cleaned up
        while (this.queue.length > 0) {
            const a = this.queue.shift()

            if (this.reducer) {
                const next = this.reducer(this.storeState, a)
                this.storeState = next.state
                this.storeActions = next.effects
            }
        }
        this.dispatching = false
    }
}
