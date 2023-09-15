import Dispatcher, {deepCopy} from '../src/utils/dispatcher'

import {
    StrategyState,
    CustomActionTemplate,
    Action,
    StrategyEvent,
    EventHandlerResults
} from '../src/types'

describe('Dispatcher Class Tests', () => {
    interface TestStrategyState extends StrategyState {
        stopLoss: number
    }
    let dispatcher: Dispatcher<TestStrategyState> // Declare a variable to hold the Dispatcher instance

    beforeEach(() => {
        dispatcher = new Dispatcher<TestStrategyState>({
            id: 'testDispatcher',
            model: {stopLoss: 0, current_period: 0},
            reducer: sampleReducer
        })
    })

    const sampleReducer = (
        prevState: TestStrategyState,
        action: Action | CustomActionTemplate<string, any>
    ): EventHandlerResults<TestStrategyState> => {
        // Simulate a reducer that increments the current_period property
        if (action.event === StrategyEvent.Props) {
            return {
                state: {
                    ...prevState,
                    stopLoss: (prevState.stopLoss || 0) - 5
                },
                actions: []
            }
        } else if (action.event === 'IncrementPeriod') {
            return {
                state: {
                    ...prevState,
                    current_period: (prevState.current_period || 0) + 1
                },
                actions: []
            }
        } else if (action.event === 'IncrementPeriodTwice') {
            return {
                state: {
                    ...prevState,
                    current_period: (prevState.current_period || 0) + 1
                },
                actions: [{event: 'IncrementPeriod', payload: {}}]
            }
        } else if (action.event === 'AdjustStopThenProps') {
            return {
                state: {
                    ...prevState,
                    stopLoss: (prevState.stopLoss || 0) - 3
                },
                actions: [{event: StrategyEvent.Props, payload: {}}]
            }
        }
        return {state: prevState, actions: []}
    }

    it('should initialize with the provided parameters', () => {
        expect(dispatcher.id).toBe('testDispatcher')
        expect(dispatcher.state()).toEqual({stopLoss: 0, current_period: 0})
        expect(dispatcher.actions()).toEqual([])
    })

    it('should dispatch actions and update the state', () => {
        dispatcher.dispatch({event: StrategyEvent.Props, payload: {}})

        expect(dispatcher.state()).toEqual({stopLoss: -5, current_period: 0})
        expect(dispatcher.actions()).toEqual([])
    })

    it('should dispatch custom actions and update the state', () => {
        dispatcher.dispatch({event: 'IncrementPeriod', payload: {}})

        expect(dispatcher.state()).toEqual({stopLoss: 0, current_period: 1})
        expect(dispatcher.actions()).toEqual([])
    })

    it('should handle action queueing', async () => {
        dispatcher.dispatch({event: 'IncrementPeriodTwice', payload: {}})
        const actions = dispatcher.actions()
        dispatcher.dispatch(actions[0])
        // Queue two more actions while dispatching
        dispatcher.dispatch({event: 'IncrementPeriod', payload: {}})
        dispatcher.dispatch({event: 'AdjustStopThenProps', payload: {}})

        // After dispatching, the state should reflect all three actions
        expect(dispatcher.state()).toEqual({stopLoss: -3, current_period: 3})
        expect(dispatcher.actions()).toEqual([{event: StrategyEvent.Props, payload: {}}])
    })
})

describe('deepCopy Function Tests', () => {
    it('should deep copy an object with nested objects and arrays', () => {
        const originalObject = {
            name: 'John',
            age: 30,
            address: {
                street: '123 Main St',
                city: 'Exampleville',
                zipCode: '12345'
            },
            hobbies: ['reading', 'coding']
        }

        const copiedObject = deepCopy(originalObject)

        expect(copiedObject).toEqual(originalObject)
        expect(copiedObject).not.toBe(originalObject)

        copiedObject.address.city = 'ModifiedCity'
        copiedObject.hobbies.push('swimming')

        expect(originalObject.address.city).toBe('Exampleville')
        expect(originalObject.hobbies).not.toContain('swimming')
    })

    it('should deep copy an array with nested objects and arrays', () => {
        const originalArray = [
            {name: 'Alice', age: 25},
            {name: 'Bob', age: 28},
            ['apple', 'banana', 'cherry']
        ]

        const copiedArray = deepCopy(originalArray)

        expect(copiedArray).toEqual(originalArray)
        expect(copiedArray).not.toBe(originalArray)

        copiedArray[0].age = 26
        copiedArray[2].push('date')
        //@ts-ignore
        expect(originalArray[0].age).toBe(25)
        expect(originalArray[2]).not.toContain('date')
    })

    it('should return null if the input is null', () => {
        const nullInput = null
        const result = deepCopy(nullInput)

        expect(result).toBeNull()
    })

    it('should return the input unchanged for non-objects and non-arrays', () => {
        const nonObjectInput = 42
        const result = deepCopy(nonObjectInput)

        expect(result).toBe(42)
    })
})
