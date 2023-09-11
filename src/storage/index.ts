import {AccessToken, MdAccessToken, Account, AccountMini} from '../types'

export default class Storage {
    private deviceId: string
    private availableAccounts: Account[]
    private accountId: number
    private spec: string
    private userId: number
    private accessToken: string
    private mdAccessToken: string
    private expiration: string

    constructor() {
        this.deviceId = ''
        this.availableAccounts = []
        this.accountId = 0
        this.spec = ''
        this.userId = 0
        this.accessToken = ''
        this.mdAccessToken = ''
        this.expiration = ''
    }
    setDeviceId(id: string) {
        this.deviceId = id
    }

    getDeviceId() {
        return this.deviceId
    }

    setAvailableAccounts(accounts: Account[]) {
        if (accounts.length === 0)
            throw new Error('[Tradovate]: Empty account passed setAvailableAccounts')
        this.availableAccounts = accounts
        // is this right? shouldnt I need to find account == active?
        this.accountId = accounts[0].id!
        this.spec = accounts[0].name
        this.userId = accounts[0].userId
    }

    /**
     * Returns and array of available accounts or undefined.
     * @returns Account[]
     */
    getAvailableAccounts(): Account[] {
        return this.availableAccounts
    }

    /**
     * Returns and array of available accounts or undefined.
     * @returns Account
     */
    getCurrentAccount(): AccountMini {
        return {
            id: this.accountId,
            name: this.spec,
            userId: this.userId
        }
    }

    /**
     * Use a predicate function to find an account. May be undefined.
     */
    queryAvailableAccounts(predicate: any) {
        return this.getAvailableAccounts().find(predicate)
    }

    setAccessToken(token: string, md_token: string, expiration: string) {
        if (!token || !expiration)
            throw new Error('[Tradovate]: Attempted to set undefined token')
        this.accessToken = token
        this.mdAccessToken = md_token
        this.expiration = expiration
    }

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

    getMdAccessToken(): MdAccessToken {
        const mdAccessToken = this.mdAccessToken
        const expiration = this.expiration
        if (!mdAccessToken) {
            console.warn(
                '[Tradovate]: No access token retrieved. Please request an access token.'
            )
        }
        return {mdAccessToken, expiration}
    }

    tokenIsValid(expiration: string): boolean {
        return new Date(expiration).getMilliseconds() - new Date().getMilliseconds() > 0
    }

    tokenNearExpiry(expiration: string): boolean {
        return (
            new Date(expiration).getMilliseconds() - new Date().getMilliseconds() <
            10 * 60 * 1000
        )
    }

    setUserData(data: any) {
        process.env.USER_DATA = JSON.stringify(data)
    }

    getUserData(): any {
        return JSON.parse(process.env.USER_DATA!)
    }
}
