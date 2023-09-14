import Storage from '../src/Storage'

describe('Storage', () => {
    let storage: Storage

    beforeEach(() => {
        storage = Storage.getInstance()
    })

    it('should set and get the device ID', () => {
        const deviceId = 'exampleDeviceId'
        storage.setDeviceId(deviceId)
        expect(storage.getDeviceId()).toBe(deviceId)
    })

    it('should set and get available accounts', () => {
        const accounts = [{id: 1, name: 'Account1', userId: 123}]
        storage.setAvailableAccounts(accounts)
        expect(storage.getAvailableAccounts()).toEqual(accounts)
    })

    it('should return the current account as an AccountMini object', () => {
        const accountId = 1
        const spec = 'Account1'
        const userId = 123
        storage.setAvailableAccounts([{id: accountId, name: spec, userId}])
        const expectedAccountMini = {id: accountId, name: spec, userId}
        expect(storage.getCurrentAccount()).toEqual(expectedAccountMini)
    })

    it('should query available accounts based on a predicate', () => {
        const accounts = [
            {id: 1, name: 'Account1', userId: 123},
            {id: 2, name: 'Account2', userId: 456}
        ]
        storage.setAvailableAccounts(accounts)

        // Define a predicate function to filter accounts.
        const predicate = account => account.userId === 123
        const result = storage.queryAvailableAccounts(predicate)

        expect(result).toEqual(accounts[0]) // Account with userId 123
    })

    it('should set and get access tokens and expiration date', () => {
        const token = 'exampleToken'
        const mdToken = 'exampleMdToken'
        const expiration = '2023-12-31T23:59:59Z'

        storage.setAccessToken(token, mdToken, expiration)

        const expectedAccessToken = {accessToken: token, expiration}
        const expectedMdAccessToken = {mdAccessToken: mdToken, expiration}

        expect(storage.getAccessToken()).toEqual(expectedAccessToken)
        expect(storage.getMdAccessToken()).toEqual(expectedMdAccessToken)
    })

    it('should check if a token is valid based on expiration', () => {
        const futureExpiration = new Date(Date.now() + 80 * 60 * 1000).toISOString()
        expect(storage.tokenIsValid(futureExpiration)).toBe(true)

        const pastExpiration = new Date(Date.now() - 1).toISOString()
        expect(storage.tokenIsValid(pastExpiration)).toBe(false)
    })

    it('should check if a token is near its expiry based on expiration', () => {
        const futureExpiration = new Date(Date.now() + 5 * 60 * 1000).toISOString()
        expect(storage.tokenNearExpiry(futureExpiration)).toBe(false)

        const farFutureExpiration = new Date(Date.now() + 79 * 60 * 1000).toISOString()
        expect(storage.tokenNearExpiry(farFutureExpiration)).toBe(false)
    })

    it('should set and get user data', () => {
        const userData = {name: 'John', email: 'john@example.com'}
        storage.setUserData(userData)
        expect(storage.getUserData()).toEqual(userData)
    })
})
