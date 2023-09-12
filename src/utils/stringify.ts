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
 * @param params - The dictionary of query parameters.
 * @returns A URL-encoded query string.
 */
export function stringifyQueryParams(params: {[k: string]: any}): string {
    const queryParams = []
    for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            const value = encodeURIComponent(params[key].toString())
            queryParams.push(`${key}=${value}`)
        }
    }
    return queryParams.join('&')
}
