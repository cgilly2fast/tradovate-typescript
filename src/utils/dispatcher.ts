import {Action, EventHandlerResults} from "./types"

export const deepCopy = (o:any) => {
    let r:any
    if(o === null) return null
    else if(Array.isArray(o) || typeof o === 'string') {
        r = o.slice()
    }
    else if(typeof o === 'object') {
        r = {}
        Object.keys(o).forEach(k => r[k] = deepCopy(o[k]))
    }
    else { r = o }
    return r
}

export const pipeMiddleware = (...fns:any) => (model:{[k:string]:any}, action:Action) => {
    let result = action
    fns.forEach((fn:any) => {
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
export interface Store {
     id?: string, 
     state: () => any, 
     effects:  any
     dispatch: (action: string, data: any) => void
}
  
export interface DispatcherParams {
    id?: string,
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
    public id?:string
    private model: any
    private reducer: any
    private mw: any
    private storeState: any
    private storeEffects: Action[]
    private dispatching: boolean
    private queue: Action[]

    
    constructor(params:DispatcherParams) {
        const {id, model, reducer, mw} = params
        this.id = id
        this.model = model
        this.reducer = reducer
        this.mw = mw
        this.storeState = deepCopy(model)  
        this.storeEffects =[], 
        this.queue = []
        this.dispatching = false
    }
    
    
    state()    {return this.storeState}
    effects()  {return this.storeEffects} 
    
    
    dispatch(event:string, data:any){ 
        const action: Action = {event, payload:data}

        if(this.dispatching) {
            this.queue.push(action)
            return
        }
        this.dispatching = true
        let result:Action = action
        
        if(this.mw && typeof this.mw === 'function') {
            result = this.mw(this.storeState, action)
        }
        if(this.reducer) {
            let next = this.reducer(this.storeState, result)
            this.storeState  = next.state
            this.storeEffects = next.effects
        }

        while(this.queue.length > 0 && this.mw) {
            let a = this.queue.shift()
            result = this.mw(this.storeState, a!)
            if(this.reducer) {
                let next = this.reducer(this.storeState, result)
                this.storeState  = next.state
                this.storeEffects = next.effects
            }
        }      
        this.dispatching = false
    }    
    
}
