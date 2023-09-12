import {Action, CustomActionTemplate, EventHandlerResults, StrategyState} from '../types'

/**
 * Performs a deep copy of an object or array.
 * @param o - The object or array to be deep copied.
 * @returns A deep copy of the input object or array.
 */
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

/**
 * Represents parameters for creating a Dispatcher instance.
 * @typeparam T - The type of the StrategyState.
 * @typeparam U - The type of the custom action template.
 * @typeparam V - The type of the custom action value.
 */
export type DispatcherParams<T extends StrategyState, U extends string, V> = {
    id?: string
    model: T
    reducer: (
        prevState: T,
        action: Action | CustomActionTemplate<U, V>
    ) => EventHandlerResults<T>
}

/**
 * Represents a dispatcher for managing state and actions in a strategy.
 * @typeparam T - The type of the StrategyState.
 */
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

    /**
     * Initializes a new instance of the Dispatcher class.
     * @param params - The parameters for creating the Dispatcher instance.
     */
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

    /**
     * Retrieves the current state managed by the Dispatcher.
     * @returns The current state of the Dispatcher.
     */
    state() {
        return this.storeState
    }

    /**
     * Retrieves the list of actions applied to the Dispatcher's state.
     * @returns The list of actions applied to the state.
     */
    actions() {
        return this.storeActions
    }

    /**
     * Dispatches an action to update the Dispatcher's state.
     * @param action - The action to dispatch.
     */
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
