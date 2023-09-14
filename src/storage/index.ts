import {AccessToken, MdAccessToken, Account, AccountMini} from '../types'

/**
 * Represents a storage utility class for managing user data and access tokens.
 */
export default class Storage {
    private deviceId: string
    private availableAccounts: Account[]
    private accountId: number
    private spec: string
    private userId: number
    private accessToken: string
    private mdAccessToken: string
    private expiration: string
    private userData: {userId: number; name: string}

    private static instance: Storage | null = null

    /**
     * Initializes a new instance of the Storage class.
     */
    constructor() {
        this.deviceId = ''
        this.availableAccounts = []
        this.accountId = 0
        this.spec = ''
        this.userId = 0
        this.accessToken = ''
        this.mdAccessToken = ''
        this.expiration = ''
        this.userData = {userId: 0, name: ''}
    }

    /**
     * Gets the singleton instance of the Storage class.
     * @returns {Storage} The singleton instance of the Storage class.
     */
    public static getInstance(): Storage {
        if (!Storage.instance) {
            Storage.instance = new Storage()
        }
        return Storage.instance
    }

    /**
     * Sets the device ID.
     * @param {string} id - The device ID to set.
     */
    setDeviceId(id: string): void {
        this.deviceId = id
    }

    /**
     * Gets the device ID.
     * @returns {string} The device ID.
     */
    getDeviceId(): string {
        return this.deviceId
    }

    /**
     * Sets the available accounts.
     * @param {Account[]} accounts - An array of available accounts.
     * @throws {Error} Throws an error if an empty array is passed.
     */
    setAvailableAccounts(accounts: Account[]): void {
        if (accounts.length === 0)
            throw new Error('[Tradovate]: Empty account passed setAvailableAccounts')
        this.availableAccounts = accounts
        // is this right? shouldn't I need to find account == active?
        this.accountId = accounts[0].id!
        this.spec = accounts[0].name
        this.userId = accounts[0].userId
    }

    /**
     * Returns an array of available accounts or undefined.
     * @returns {Account[]} An array of available accounts.
     */
    getAvailableAccounts(): Account[] {
        return this.availableAccounts
    }

    /**
     * Returns the current account as an AccountMini object.
     * @returns {AccountMini} The current account as an AccountMini object.
     */
    getCurrentAccount(): AccountMini {
        return {
            id: this.accountId,
            name: this.spec,
            userId: this.userId
        }
    }

    /**
     * Uses a predicate function to find an account. May be undefined.
     * @param {function} predicate - A predicate function to filter accounts.
     * @returns {Account | undefined} The first matching account or undefined.
     */
    queryAvailableAccounts(
        predicate: (account: Account) => boolean
    ): Account | undefined {
        return this.getAvailableAccounts().find(predicate)
    }

    /**
     * Sets the access tokens and expiration date.
     * @param {string} token - The access token.
     * @param {string} md_token - The market data access token.
     * @param {string} expiration - The expiration date of the tokens.
     * @throws {Error} Throws an error if either token or expiration is undefined.
     */
    setAccessToken(token: string, md_token: string, expiration: string): void {
        if (!token || !expiration)
            throw new Error('[Tradovate]: Attempted to set an undefined token')
        this.accessToken = token
        this.mdAccessToken = md_token
        this.expiration = expiration
    }

    /**
     * Gets the access token and its expiration date.
     * @returns {AccessToken} An AccessToken object.
     */
    getAccessToken(): AccessToken {
        const accessToken = this.accessToken
        const expiration = this.expiration
        if (!accessToken) {
            console.warn(
                '[Tradovate]: No access token retrieved. Please request an access token.'
            )
        }
        return {accessToken, expiration}
    }

    /**
     * Gets the market data access token and its expiration date.
     * @returns {MdAccessToken} A MdAccessToken object.
     */
    getMdAccessToken(): MdAccessToken {
        const mdAccessToken = this.mdAccessToken
        const expiration = this.expiration
        if (!mdAccessToken) {
            console.warn(
                '[Tradovate]: No market data access token retrieved. Please request an access token.'
            )
        }
        return {mdAccessToken, expiration}
    }

    /**
     * Checks if a token is valid based on its expiration date.
     * @param {string} expiration - The expiration date of the token.
     * @returns {boolean} A boolean indicating whether the token is valid.
     */
    tokenIsValid(expiration: string): boolean {
        return new Date(expiration).getTime() - new Date().getTime() > 0
    }

    /**
     * Checks if a token is near its expiry based on its expiration date.
     * @param {string} expiration - The expiration date of the token.
     * @returns {boolean} A boolean indicating whether the token is near its expiry.
     */
    tokenNearExpiry(expiration: string): boolean {
        return new Date(expiration).getTime() - new Date().getTime() < 10 * 60 * 1000
    }

    /**
     * Sets user data as an environment variable.
     * @param {{userId: number, name: string}} data - User data to be stored.
     */
    setUserData(data: {userId: number; name: string}): void {
        this.userData = data
    }

    /**
     * Gets user data from the environment variable.
     * @returns {{userId: number, name: string}} User data.
     */
    getUserData(): {userId: number; name: string} {
        return this.userData
    }
}
