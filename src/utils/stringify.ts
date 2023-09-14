/**
 * Converts one or more JavaScript objects into a formatted JSON string.
 * @param args - The objects to stringify.
 * @returns A formatted JSON string representation of the provided objects.
 */
export function stringify(...args: any[]): string {
    const result: string[] = []
    for (let i = 0; i < args.length; i++) {
        result.push(JSON.stringify(args[i], null, 2))
    }
    return result.join('\n')
}

/**
 * Converts a dictionary of query parameters into a URL-encoded query string.
 * @param query - The dictionary of query parameters.
 * @returns A URL-encoded query string.
 *
 * @example
 * ```
 * const queryParams = {name: 'ESU3'}
 * const stringified = stringifyQueryParams(queryParams) // Output:'name=ESU3'
 * ```
 */
export function stringifyQueryParams(query: any): string {
    if (query === undefined || Object.keys(query).length === 0) return ''
    const queryParams = []
    for (const key in query) {
        if (Object.prototype.hasOwnProperty.call(query, key)) {
            const value = encodeURIComponent(query[key].toString())
            queryParams.push(`${key}=${value}`)
        }
    }
    return queryParams.join('&')
}
