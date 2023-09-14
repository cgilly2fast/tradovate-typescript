import {waitForMs, waitUntil} from '../src/utils/wait' // Import your utility functions

describe('waitForMs Function Tests', () => {
    it('should delay execution for the specified time', async () => {
        const startTime = Date.now()
        const delay = 1000 // 1 second

        await waitForMs(delay)

        const endTime = Date.now()
        const elapsedTime = endTime - startTime

        // Allow for some margin of error due to test execution time
        expect(elapsedTime).toBeGreaterThanOrEqual(delay - 50) // within 50ms of expected delay
        expect(elapsedTime).toBeLessThan(delay + 50) // within 50ms of expected delay
    })
})

describe('waitUntil Function Tests', () => {
    it('should resolve when the predicate becomes true', async () => {
        let isReady = false

        // Start a timer to set isReady to true after 1 second
        setTimeout(() => {
            isReady = true
        }, 1000)

        // Wait until isReady becomes true
        await waitUntil(() => isReady)

        // Check that isReady is now true
        expect(isReady).toBe(true)
    })

    it('should resolve immediately if the predicate is initially true', async () => {
        let isReady = true // Predicate is initially true

        // Wait until isReady becomes true
        await waitUntil(() => isReady)

        // Check that isReady is still true
        expect(isReady).toBe(true)
    })

    it('should keep checking the predicate until it becomes true', async () => {
        let isReady = false

        setTimeout(() => {
            isReady = true
        }, 2000) // Set isReady to true after 2 seconds

        const startTime = Date.now()
        await waitUntil(() => isReady)
        const endTime = Date.now()

        const elapsedTime = endTime - startTime

        // Ensure that it waited for isReady to become true
        expect(isReady).toBe(true)

        // Allow for some margin of error due to test execution time
        expect(elapsedTime).toBeGreaterThanOrEqual(2000 - 50) // within 50ms of expected delay
        expect(elapsedTime).toBeLessThan(2000 + 50) // within 50ms of expected delay
    })
})
