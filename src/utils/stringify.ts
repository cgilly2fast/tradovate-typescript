export function stringify(...args: any[]): string {
    const result: string[] = []
    for (let i = 0; i < args.length; i++) {
        result.push(JSON.stringify(args[i], null, 2))
    }
    return result.join('\n')
}

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
