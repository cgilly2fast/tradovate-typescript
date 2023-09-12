import axios from 'axios'
import {URLs, AccessToken, Dictionary, AccessTokenRequestBody} from '../types'
import Storage from '../storage'
import {waitForMs} from '../utils/wait'
import {stringifyQueryParams} from '../utils/stringify'

const {DEMO_URL, LIVE_URL} = URLs
/**
 * Provides functionality for making HTTP requests to the Tradovate REST API.
 */
export default class TradovateService {
    private storage: Storage

    constructor() {
        this.storage = new Storage()
    }
    /**
     * Makes a GET requests to the Tradovate REST API. The passed `query` object will be reconstructed to a query string and placed in the query position of the URL.
     * @example
     * ```js
     * //no parameters
     *  const jsonResponseA = await tvGet('/account/list')
     *
     * //parameter object, URL will become '/contract/item?id=2287764'
     * const jsonResponseB = await tvGet('/contract/item', { id: 2287764 })
     * ```
     *
     * @param {string} endpoint - The API endpoint to call.
     * @param {{ [k: string]: any }} query - The query parameters as key-value pairs.
     * @param {'demo' | 'live'} env - The environment (demo or live).
     * @returns {Promise<any>} A promise that resolves to the response data.
     */
    async get(
        endpoint: string,
        query: Record<string, string | number> = {},
        env = 'demo'
    ) {
        const {accessToken} = this.storage.getAccessToken()
        try {
            let q = ''
            if (query) {
                q = stringifyQueryParams(query)
            }

            const baseURL = env === 'demo' ? DEMO_URL : env === 'live' ? LIVE_URL : ''
            if (!baseURL)
                throw new Error(
                    `[Services:tvGet] => 'env' variable should be either 'live' or 'demo'.`
                )

            const url = query !== null ? baseURL + endpoint + q : baseURL + endpoint

            console.log('[Tradovate]: ' + url)
            console.log('[Tradovate]: With query:', q.toString() || '<no query>')

            const res = await axios({
                url: url,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            const results = await res.data

            return results
        } catch (err) {
            console.error('[Tradovate]: tvGet' + err)
        }
    }

    /**
     * Makes a POST requests to the Tradovate REST API. `data` will be placed in the body of the request as JSON.
     * @example
     * ```js
     * //placing an order with tvPost
     * const jsonResponseC = await tvPost('/order/placeorder', {
     *   accountSpec: myAcct.name,
     *   accountId: myAcct.id,
     *   action: 'Buy',
     *   symbol: 'MNQM1',
     *   orderQty: 2,
     *   orderType: 'Market',
     *   isAutomated: true //was this order placed by you or your robot?
     * })
     * ```
     *
     * @param {string} endpoint - The API endpoint to call.
     * @param {{ [k: string]: any }} data - The data to send in the request body as JSON.
     * @param {boolean} usetoken - Indicates whether to use an access token in the request.
     * @param {'live' | 'demo'} env - The environment (demo or live).
     * @returns {Promise<any>} A promise that resolves to the response data.
     */
    async post(
        endpoint: string,
        data: Dictionary,
        usetoken: boolean = true,
        env = 'demo'
    ) {
        let accessToken: AccessToken
        if (usetoken) accessToken = this.storage.getAccessToken()

        const bearer = usetoken
            ? {Authorization: `Bearer ${accessToken!.accessToken}`}
            : {}

        const baseURL = env === 'demo' ? DEMO_URL : env === 'live' ? LIVE_URL : ''
        if (!baseURL)
            throw new Error(
                `[Services:tvPost] => 'env' variable should be either 'live' or 'demo'.`
            )

        console.log('[Tradovate]: ' + baseURL + endpoint)

        try {
            const res = await axios({
                url: baseURL + endpoint,
                method: 'POST',
                headers: {
                    ...bearer,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                data: data
            })

            const results = await res.data

            return results
        } catch (err) {
            console.error('[Tradovate]: tvPost: ' + err)
        }
    }
    /**
     * Renews the stored access token.
     * @param {boolean} live - Indicates whether to renew the access token for the live environment.
     * @returns {Promise<any>} A promise that resolves to the renewed access token information.
     */
    renewAccessToken = async (live: boolean = false) => {
        const {accessToken, expiration} = this.storage.getAccessToken()
        if (
            accessToken &&
            expiration &&
            this.storage.tokenIsValid(expiration) &&
            !this.storage.tokenNearExpiry(expiration)
        ) {
            console.log(
                '[Tradovate]: Already have an accessToken. Using existing accessToken.'
            )
            const {accessToken, expiration} = this.storage.getAccessToken()
            const {userId, name} = this.storage.getUserData()
            return {accessToken: accessToken, expirationTime: expiration, userId, name}
        }

        console.log('[Tradovate]: Renewing accessToken...')
        const env = live ? 'live' : 'demo'
        const authResponse = await this.get('/auth/renewaccesstoken', {}, env)
        if (authResponse['p-ticket']) {
            return await this.handleRenewRetry(env, authResponse)
        } else {
            const {
                errorText,
                accessToken,
                mdAccessToken,
                userId,
                userStatus,
                name,
                expirationTime
            } = authResponse

            if (errorText) {
                console.error('[Tradovate]: Error in accessToken renewal: ' + errorText)
                return
            }

            this.storage.setAccessToken(accessToken, mdAccessToken, expirationTime)

            console.log(
                `[Tradovate]: Successfully stored RENEWED accessToken ${accessToken} for user {name: ${name}, ID: ${userId}, status: ${userStatus}}.`
            )
            return authResponse
        }
    }
    /**
     * Handles retrying an operation when a time penalty is present.
     * @param {string} env - The environment (demo or live).
     * @param {any} json - The response data.
     */
    handleRenewRetry = async (env: string, json: any) => {
        const ticket = json['p-ticket'],
            time = json['p-time'],
            captcha = json['p-captcha']

        if (captcha) {
            console.error(
                '[Tradovate]: Captcha present, cannot retry auth request via third party application. Please try again in an hour.'
            )
            return
        }

        console.log(
            `[Tradovate]: Time Penalty present. Retrying operation in ${time}s. P-Ticket: ${ticket}`
        )

        await waitForMs(time * 1000)
        await this.get('/auth/renewaccesstoken', {}, env)
    }
    /**
     * Connects to the Tradovate API.
     * @param {AccessTokenRequestBody} data - The data for connecting to the API.
     * @returns {Promise<any>} A promise that resolves to the response data.
     */
    connect = async (data: AccessTokenRequestBody) => {
        const {accessToken, expiration} = this.storage.getAccessToken()
        if (
            accessToken &&
            expiration &&
            this.storage.tokenIsValid(expiration) &&
            !this.storage.tokenNearExpiry(expiration)
        ) {
            console.log(
                '[Tradovate]: Already have an accessToken. Using existing accessToken.'
            )
            const {accessToken, expiration} = this.storage.getAccessToken()
            const {userId, name} = this.storage.getUserData()
            return {accessToken: accessToken, expirationTime: expiration, userId, name}
        }

        const authResponse = await this.post('/auth/accesstokenrequest', data, false)
        if (authResponse['p-ticket']) {
            return await this.handleConnectRetry(data, authResponse)
        } else {
            const {
                errorText,
                accessToken,
                mdAccessToken,
                userId,
                userStatus,
                name,
                expirationTime
            } = authResponse
            if (errorText) {
                console.error(`[Tradovate]: P-Ticket Error: ${errorText}`)
                return
            }

            this.storage.setAccessToken(accessToken, mdAccessToken, expirationTime)

            const accounts = await this.get('/account/list')

            this.storage.setAvailableAccounts(accounts)

            console.log(
                `[Tradovate]: Successfully stored accessToken ${accessToken} for user {name: ${name}, ID: ${userId}, status: ${userStatus}}.`
            )
            return authResponse
        }
    }

    private async handleConnectRetry(data: any, json: any) {
        const ticket = json['p-ticket'],
            time = json['p-time'],
            captcha = json['p-captcha']

        if (captcha) {
            console.error(
                '[Tradovate]: Captcha present, cannot retry auth request via third party application. Please try again in an hour.'
            )
            return
        }

        console.log(`[Tradovate]: Time Penalty present. Retrying operation in ${time}s`)

        await waitForMs(time * 1000)
        await this.connect({...data, 'p-ticket': ticket})
    }
}
