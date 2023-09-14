import {stringify, stringifyQueryParams} from '../src/utils/stringify' // Import your utility functions

describe('stringify Function Tests', () => {
    it('should convert an object to a formatted JSON string', () => {
        const obj = {name: 'John', age: 30}
        const expectedJson = '{\n  "name": "John",\n  "age": 30\n}'

        const result = stringify(obj)

        expect(result).toBe(expectedJson)
    })

    it('should convert multiple objects to a formatted JSON string with line breaks', () => {
        const obj1 = {name: 'John', age: 30}
        const obj2 = {city: 'New York', country: 'USA'}
        const expectedJson =
            '{\n  "name": "John",\n  "age": 30\n}\n{\n  "city": "New York",\n  "country": "USA"\n}'

        const result = stringify(obj1, obj2)

        expect(result).toBe(expectedJson)
    })
})

describe('stringifyQueryParams Function Tests', () => {
    it('should convert a dictionary of query parameters to a URL-encoded query string', () => {
        const queryParams = {
            name: 'John',
            age: 30,
            city: 'New York'
        }
        const expectedQueryString = 'name=John&age=30&city=New%20York'

        const result = stringifyQueryParams(queryParams)

        expect(result).toBe(expectedQueryString)
    })

    it('should handle special characters in query values', () => {
        const queryParams = {
            name: 'John Doe',
            email: 'john.doe@example.com'
        }
        const expectedQueryString = 'name=John%20Doe&email=john.doe%40example.com'

        const result = stringifyQueryParams(queryParams)

        expect(result).toBe(expectedQueryString)
    })

    it('should return an empty string for an empty query object', () => {
        const queryParams = {}

        const result = stringifyQueryParams(queryParams)

        expect(result).toBe('')
    })

    it('should return an empty string for undefined query', () => {
        const queryParams = undefined

        const result = stringifyQueryParams(queryParams)

        expect(result).toBe('')
    })
})
