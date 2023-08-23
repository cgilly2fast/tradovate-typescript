export const waitForMs = (t: any) => {
    return new Promise((res: any) => {
        setTimeout(() => {
            res()
        }, t)
    })
}

export const waitUntil = (pred: () => boolean): Promise<void> => {
    return new Promise((res: any) => {
        const checkPredicate = () => {
            if (pred()) {
                res() // Resolve the outer promise when the predicate is true
            } else {
                setTimeout(checkPredicate, 100) // Check again after 100ms
            }
        }

        checkPredicate() // Start checking the predicate
    })
}
