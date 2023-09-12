/**
 * Delays the execution of code for the specified number of milliseconds.
 * @param t - The time to wait in milliseconds.
 * @returns A Promise that resolves after the specified time has elapsed.
 */
export const waitForMs = (t: number): Promise<void> => {
    return new Promise((resolve: () => void) => {
        setTimeout(() => {
            resolve()
        }, t)
    })
}

/**
 * Waits until a specified predicate function returns true before resolving.
 * @param pred - The predicate function to evaluate.
 * @returns A Promise that resolves when the predicate function returns true.
 */
export const waitUntil = (pred: () => boolean): Promise<void> => {
    return new Promise((resolve: () => void) => {
        const checkPredicate = () => {
            if (pred()) {
                resolve() // Resolve the outer promise when the predicate is true
            } else {
                setTimeout(checkPredicate, 100) // Check again after 100ms
            }
        }

        checkPredicate() // Start checking the predicate
    })
}
