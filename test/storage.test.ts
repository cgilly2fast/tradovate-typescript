import {Account, AccountType, LegalStatus, MarginAccountType} from '../src'
import Storage from '../src/storage' // Adjust the import path accordingly

describe('Storage Class Tests', () => {
    let storageInstance: Storage

    beforeEach(() => {
        storageInstance = new Storage()
    })

    it('should return the same instance for multiple calls to getInstance', () => {
        const instance1 = Storage.getInstance()
        const instance2 = Storage.getInstance()

        expect(instance1).toBe(instance2)
    })

    it('should set and get the device ID', () => {
        const deviceId = 'sampleDeviceId'

        storageInstance.setDeviceId(deviceId)

        const retrievedDeviceId = storageInstance.getDeviceId()

        expect(retrievedDeviceId).toBe(deviceId)
    })

    it('should set and get available accounts', () => {
        const accounts: Account[] = [
            {
                id: 1234567,
                name: 'DEMO131344444',
                userId: 1344444,
                accountType: AccountType.Customer,
                active: true,
                clearingHouseId: 2,
                riskCategoryId: 2,
                autoLiqProfileId: 1,
                marginAccountType: MarginAccountType.Speculator,
                legalStatus: LegalStatus.Individual,
                archived: false,
                timestamp: '2023-06-27T17:38:42Z'
            },
            {
                id: 7654321,
                name: 'DEMO1324578',
                userId: 1324578,
                accountType: AccountType.Customer,
                active: true,
                clearingHouseId: 2,
                riskCategoryId: 2,
                autoLiqProfileId: 1,
                marginAccountType: MarginAccountType.Speculator,
                legalStatus: LegalStatus.Individual,
                archived: false,
                timestamp: '2023-06-27T17:38:42Z'
            }
        ]

        storageInstance.setAvailableAccounts(accounts)

        const retrievedAccounts = storageInstance.getAvailableAccounts()

        expect(retrievedAccounts).toEqual(accounts)
    })

    it('should throw an error when setAvailableAccounts is called with an empty array', () => {
        const emptyAccounts: Account[] = []

        expect(() => {
            storageInstance.setAvailableAccounts(emptyAccounts)
        }).toThrowError('[Tradovate]: Empty account passed setAvailableAccounts')
    })

    it('should return an empty array when getAvailableAccounts is called before setting accounts', () => {
        const retrievedAccounts = storageInstance.getAvailableAccounts()

        expect(retrievedAccounts).toEqual([])
    })

    // Test getCurrentAccount method
    it('should return the current account as an AccountMini object', () => {
        const accounts = [
            {
                id: 1234567,
                name: 'DEMO131344444',
                userId: 1344444,
                accountType: AccountType.Customer,
                active: true,
                clearingHouseId: 2,
                riskCategoryId: 2,
                autoLiqProfileId: 1,
                marginAccountType: MarginAccountType.Speculator,
                legalStatus: LegalStatus.Individual,
                archived: false,
                timestamp: '2023-06-27T17:38:42Z'
            },
            {
                id: 7654321,
                name: 'DEMO1324578',
                userId: 1324578,
                accountType: AccountType.Customer,
                active: true,
                clearingHouseId: 2,
                riskCategoryId: 2,
                autoLiqProfileId: 1,
                marginAccountType: MarginAccountType.Speculator,
                legalStatus: LegalStatus.Individual,
                archived: false,
                timestamp: '2023-06-27T17:38:42Z'
            }
        ]

        storageInstance.setAvailableAccounts(accounts)

        const currentAccount = storageInstance.getCurrentAccount()

        expect(currentAccount).toEqual({
            id: accounts[0].id,
            name: accounts[0].name,
            userId: accounts[0].userId
        })
    })

    it('should return the first matching account or undefined using queryAvailableAccounts', () => {
        const accounts = [
            {
                id: 1234567,
                name: 'DEMO131344444',
                userId: 1344444,
                accountType: AccountType.Customer,
                active: true,
                clearingHouseId: 2,
                riskCategoryId: 2,
                autoLiqProfileId: 1,
                marginAccountType: MarginAccountType.Speculator,
                legalStatus: LegalStatus.Individual,
                archived: false,
                timestamp: '2023-06-27T17:38:42Z'
            },
            {
                id: 7654321,
                name: 'DEMO1324578',
                userId: 1324578,
                accountType: AccountType.Customer,
                active: true,
                clearingHouseId: 2,
                riskCategoryId: 2,
                autoLiqProfileId: 1,
                marginAccountType: MarginAccountType.Speculator,
                legalStatus: LegalStatus.Individual,
                archived: false,
                timestamp: '2023-06-27T17:38:42Z'
            }
        ]

        storageInstance.setAvailableAccounts(accounts)

        const predicate = (account: Account) => account.active === true
        const matchingAccount = storageInstance.queryAvailableAccounts(predicate)

        expect(matchingAccount).toEqual(accounts[0])
    })

    it('should return undefined when no matching account is found using queryAvailableAccounts', () => {
        const accounts = [
            {
                id: 1234567,
                name: 'DEMO131344444',
                userId: 1344444,
                accountType: AccountType.Customer,
                active: true,
                clearingHouseId: 2,
                riskCategoryId: 2,
                autoLiqProfileId: 1,
                marginAccountType: MarginAccountType.Speculator,
                legalStatus: LegalStatus.Individual,
                archived: false,
                timestamp: '2023-06-27T17:38:42Z'
            },
            {
                id: 7654321,
                name: 'DEMO1324578',
                userId: 1324578,
                accountType: AccountType.Customer,
                active: true,
                clearingHouseId: 2,
                riskCategoryId: 2,
                autoLiqProfileId: 1,
                marginAccountType: MarginAccountType.Speculator,
                legalStatus: LegalStatus.Individual,
                archived: false,
                timestamp: '2023-06-27T17:38:42Z'
            }
        ]

        storageInstance.setAvailableAccounts(accounts)

        const predicate = (account: Account) => account.userId === 103
        const matchingAccount = storageInstance.queryAvailableAccounts(predicate)

        expect(matchingAccount).toBeUndefined()
    })

    // Test setAccessToken and getAccessToken methods
    it('should set and get the access token and its expiration date', () => {
        const accessToken = 'sampleAccessToken'
        const mdAccessToken = 'sampleMdAccessToken'
        const expiration = '2023-12-31T23:59:59Z'

        storageInstance.setAccessToken(accessToken, mdAccessToken, expiration)

        const retrievedAccessToken = storageInstance.getAccessToken()

        expect(retrievedAccessToken).toEqual({
            accessToken: accessToken,
            expirationTime: expiration
        })
    })

    it('should throw an error when setAccessToken is called with undefined token or expiration', () => {
        const accessToken = 'sampleAccessToken'
        const mdAccessToken = 'sampleMdAccessToken'

        expect(() => {
            // @ts-ignore
            storageInstance.setAccessToken(accessToken, mdAccessToken, undefined)
        }).toThrowError('[Tradovate]: Attempted to set an undefined token')
    })

    it('should get the market data access token and its expiration date', () => {
        const mdAccessToken = 'sampleMdAccessToken'
        const expiration = '2023-12-31T23:59:59Z'

        storageInstance.setAccessToken('sampleAccessToken', mdAccessToken, expiration)

        const retrievedMdAccessToken = storageInstance.getMdAccessToken()

        expect(retrievedMdAccessToken).toEqual({
            mdAccessToken: mdAccessToken,
            expirationTime: expiration
        })
    })

    it('should throw a warning when getMdAccessToken is called with an null market data access token', () => {
        storageInstance.setAccessToken('sampleAccessToken', '', '2023-12-31T23:59:59Z')

        const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

        const retrievedMdAccessToken = storageInstance.getMdAccessToken()

        expect(retrievedMdAccessToken).toEqual({
            mdAccessToken: '',
            expirationTime: '2023-12-31T23:59:59Z'
        })
        expect(consoleWarnSpy).toHaveBeenCalledWith(
            '[Tradovate]: No market data access token retrieved. Please request an access token.'
        )

        consoleWarnSpy.mockRestore()
    })

    it('should return true for a valid token', () => {
        const currentDateTime = new Date().getTime()
        const expiration = new Date(currentDateTime + 60 * 60 * 1000).toISOString()

        const isValid = storageInstance.tokenIsValid(expiration)

        expect(isValid).toBe(true)
    })

    it('should return false for an expired token', () => {
        const currentDateTime = new Date().getTime()
        const expiration = new Date(currentDateTime - 1).toISOString()

        const isValid = storageInstance.tokenIsValid(expiration)

        expect(isValid).toBe(false)
    })

    it('should return true when token is near expiry', () => {
        const currentDateTime = new Date().getTime()
        const expiration = new Date(currentDateTime + 9 * 60 * 1000).toISOString()

        const isNearExpiry = storageInstance.tokenNearExpiry(expiration)

        expect(isNearExpiry).toBe(true)
    })

    it('should return false when token is not near expiry', () => {
        const currentDateTime = new Date().getTime()
        const expiration = new Date(currentDateTime + 11 * 60 * 1000).toISOString()

        const isNearExpiry = storageInstance.tokenNearExpiry(expiration)

        expect(isNearExpiry).toBe(false)
    })

    it('should set and get user data', () => {
        const userData = {userId: 1234567, name: 'DEMO131344444'}

        storageInstance.setUserData(userData)

        const retrievedUserData = storageInstance.getUserData()

        expect(retrievedUserData).toEqual(userData)
    })

    it('should clear storage of all values back to null', () => {
        const accessToken = 'sampleAccessToken'
        const mdAccessToken = 'sampleMdAccessToken'
        const expiration = '2023-12-31T23:59:59Z'

        const userData = {userId: 1234567, name: 'DEMO131344444'}

        storageInstance.setAccessToken(accessToken, mdAccessToken, expiration)
        storageInstance.setUserData(userData)
        storageInstance.clear()

        const retrievedAccessToken = storageInstance.getAccessToken()
        const retrievedUserData = storageInstance.getUserData()

        expect(retrievedUserData).toEqual({userId: 0, name: ''})

        expect(retrievedAccessToken).toEqual({
            accessToken: '',
            expirationTime: ''
        })
    })
})
