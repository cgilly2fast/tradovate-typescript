import axios from 'axios'
import {URLs, AccessToken, Dictionary} from '../types'
import Storage from '../storage/storage'
import {waitForMs} from '../utils/wait'

const {DEMO_URL, LIVE_URL} = URLs

export default class Service {
    private storage: Storage

    constructor() {
        this.storage = new Storage()
    }
    /**
     * Call to make GET requests to the Tradovate REST API. The passed `query` object will be reconstructed to a query string and placed in the query position of the URL.
     * ```js
     * //no parameters
     *  const jsonResponseA = await tvGet('/account/list')
     *
     * //parameter object, URL will become '/contract/item?id=2287764'
     * const jsonResponseB = await tvGet('/contract/item', { id: 2287764 })
     * ```
     *
     * @param {string} endpoint
     * @param {{[k:string]: any}} query object key-value-pairs will be converted into query, for ?masterid=1234 use `{masterid: 1234}`
     * @param {'demo' | 'live'} env
     * @returns
     */
    async get(endpoint: string, query: Dictionary = {}, env = 'demo') {
        const {accessToken} = this.storage.getAccessToken()
        try {
            let q = ''
            if (query) {
                q = Object.keys(query).reduce((acc, next, i, arr) => {
                    acc += next + '=' + query[next]
                    if (i !== arr.length - 1) acc += '&'
                    return acc
                }, '?')
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
     * Use this function to make POST requests to the Tradovate REST API. `data` will be placed in the body of the request as JSON.
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
     * @param {string} endpoint
     * @param {{[k:string]: any}} data
     * @param {boolean} usetoken
     * @param {'live' | 'demo'} env
     * @returns
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

    connect = async (data: any) => {
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
