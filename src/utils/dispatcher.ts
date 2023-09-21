import {
    Action,
    CustomActionTemplate,
    EventHandlerResults,
    StrategyState,
    DispatcherParams
} from '../types'

/**
 * Performs a deep copy of an object or array.
 * @param o - The object or array to be deep copied.
 * @returns A deep copy of the input object or array.
 */
export const deepCopy = (o: any): any => {
    if (o === null || typeof o !== 'object') {
        return o
    }

    if (Array.isArray(o)) {
        return o.map(item => deepCopy(item))
    }

    const result: any = {}
    for (const key in o) {
        if (Object.prototype.hasOwnProperty.call(o, key)) {
            result[key] = deepCopy(o[key])
        }
    }

    return result
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
    private storeActions: (Action | CustomActionTemplate<string, any>)[]
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
    getState() {
        return this.storeState
    }

    /**
     * Retrieves the list of actions applied to the Dispatcher's state.
     * @returns The list of actions applied to the state.
     */
    getActions() {
        return this.storeActions
    }

    /**
     * Dispatches an action to update the Dispatcher's state.
     * @param action - The action to dispatch.
     */
    dispatch(action: Action | CustomActionTemplate<string, any>) {
        this.queue.push(action)
        if (this.dispatching) {
            return
        }
        this.dispatching = true

        while (this.queue.length > 0) {
            const a = this.queue.shift()

            if (a !== undefined) {
                const next = this.reducer(this.storeState, a)
                this.storeState = next.state
                this.storeActions = next.actions
            }
        }
        this.dispatching = false
    }
}
