import axios from 'axios'
import {
    URLs,
    AccessToken,
    PenaltyResponse,
    AccessTokenRequestBody,
    GetEndpointQueryParams,
    GetEndpoints,
    EndpointResponse,
    PostEndpoints,
    PostEndpointBodyParams,
    isPenaltyResponse,
    AccessTokenResponse
} from '../types'
import Storage from '../storage'
import {waitForMs} from '../utils/wait'
import {stringify, stringifyQueryParams} from '../utils/stringify'

const {DEMO_URL, LIVE_URL} = URLs
/**
 * Provides functionality for making HTTP requests to the Tradovate REST API.
 */
export default class TradovateService {
    private storage: Storage

    constructor() {
        this.storage = Storage.getInstance()
    }
    /**
     * Makes a GET request to the Tradovate REST API.
     *
     * @param endpoint - The API endpoint to call.
     * @param env - The environment (demo or live).
     * @param query - The query parameters as key-value pairs.
     *
     * @returns A promise that resolves to the response data.
     *
     * @example
     * ```typescript
     * // No parameters
     * const jsonResponseA = await tvGet('/account/list');
     *
     * // With parameter object, URL will become '/contract/item?id=2287764'
     * const jsonResponseB = await tvGet('/contract/item', { id: 2287764 });
     * ```
     */
    get = async <T extends GetEndpoints>(
        endpoint: T,
        query?: GetEndpointQueryParams[T],
        live: boolean = false
    ): Promise<EndpointResponse[T] | PenaltyResponse> => {
        const {accessToken} = this.storage.getAccessToken()
        const baseURL = live ? LIVE_URL : DEMO_URL
        const stringyQuery = stringifyQueryParams(query)

        try {
            const url =
                query !== null
                    ? baseURL + '/' + endpoint + '?' + stringyQuery
                    : baseURL + '/' + endpoint

            console.log('[Tradovate]: ' + url)
            console.log(
                '[Tradovate]: With query:',
                stringyQuery.toString() || '<no query>'
            )

            const res = await axios({
                url: url,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            return res.data
        } catch (err) {
            console.error('[Tradovate]: tvGet' + err)
            throw new Error('service.get' + err)
        }
    }

    /**
     * Makes a POST request to the Tradovate REST API.
     *
     * @param endpoint - The API endpoint to call.
     * @param env - The environment (demo or live).
     * @param data - The data to send in the request body as JSON.
     * @param useToken - Indicates whether to use an access token in the request.
     *
     * @returns A promise that resolves to the response data.
     *
     * @example
     * ```typescript
     * // Placing an order with tvPost
     * const jsonResponseC = await tvPost('/order/placeorder', {
     *   accountSpec: myAcct.name,
     *   accountId: myAcct.id,
     *   action: 'Buy',
     *   symbol: 'MNQM1',
     *   orderQty: 2,
     *   orderType: 'Market',
     *   isAutomated: true, // Was this order placed by you or your robot?
     * });
     * ```
     */

    post = async <T extends PostEndpoints>(
        endpoint: T,
        data?: PostEndpointBodyParams[T],
        live: boolean = false,
        useToken: boolean = true
    ): Promise<EndpointResponse[T] | PenaltyResponse> => {
        let accessToken: AccessToken
        if (useToken) accessToken = this.storage.getAccessToken()

        const bearer = useToken
            ? {Authorization: `Bearer ${accessToken!.accessToken}`}
            : {}

        const baseURL = live ? LIVE_URL : DEMO_URL

        const request = baseURL + '/' + endpoint
        console.log(`[Tradovate]: ${request}`)

        try {
            const res = await axios({
                url: request,
                method: 'POST',
                headers: {
                    ...bearer,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                data: data
            })

            return res.data
        } catch (err) {
            console.error('[Tradovate]: tvPost: ' + err)
            throw new Error('service.post ' + err)
        }
    }
    /**
     * Renews the stored access token.
     *
     * @param env - Indicates whether to renew the access token for the live environment or demo environment.
     *
     * @returns A promise that resolves to the renewed access token information.
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
        const authResponse = await this.get('auth/renewaccesstoken', undefined, live)
        if (isPenaltyResponse(authResponse)) {
            return await this.handleRenewRetry(live, authResponse)
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

            this.storage.setAccessToken(accessToken!, mdAccessToken!, expirationTime!)

            console.log(
                `[Tradovate]: Successfully stored RENEWED accessToken ${accessToken} for user {name: ${name}, ID: ${userId}, status: ${userStatus}}.`
            )
            return authResponse
        }
    }

    /**
     * Handles retrying an operation when a time penalty is present.
     *
     * @param env - The environment (demo or live).
     * @param penaltyResponse - The response data.
     *
     * @returns A promise that resolves to either PenaltyResponse or AccessTokenResponse.
     */
    handleRenewRetry = async (
        live: boolean,
        penaltyResponse: PenaltyResponse
    ): Promise<PenaltyResponse | AccessTokenResponse> => {
        if (!isPenaltyResponse(penaltyResponse))
            throw new Error('Did not pass a PenaltyResponse to handleRenewRetry')
        const ticket = penaltyResponse['p-ticket'],
            time = penaltyResponse['p-time'],
            captcha = penaltyResponse['p-captcha']

        if (captcha) {
            throw new Error(
                '[Tradovate]: Captcha present, cannot retry auth request via third party application. Please try again in an hour.'
            )
        }

        console.log(
            `[Tradovate]: Time Penalty present. Retrying operation in ${time}s. P-Ticket: ${ticket}`
        )

        await waitForMs(time! * 1000)
        return await this.get('auth/renewaccesstoken', undefined, live)
    }

    /**
     * Connects to the Tradovate API.
     *
     * @param data - The data for connecting to the API.
     * @param env - The environment (demo or live).
     *
     * @returns A promise that resolves to the response data.
     */
    connect = async (
        data: AccessTokenRequestBody,
        live: boolean = false
    ): Promise<AccessTokenResponse> => {
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

        const authResponse = await this.post('auth/accesstokenrequest', data, live, false)
        if (isPenaltyResponse(authResponse)) {
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
                console.error(`[Tradovate]: Error: ${errorText}`)
                throw new Error(errorText)
            }

            this.storage.setAccessToken(accessToken!, mdAccessToken!, expirationTime!)

            this.storage.setUserData({userId: userId!, name: name!})

            const accounts = await this.get('account/list')

            if (isPenaltyResponse(accounts))
                throw new Error(`Rate limit hit ${stringify(accounts)}`)

            this.storage.setAvailableAccounts(accounts)

            console.log(
                `[Tradovate]: Successfully stored accessToken ${accessToken} for user {name: ${name}, ID: ${userId}, status: ${userStatus}}.`
            )
            return authResponse
        }
    }

    /**
     * Handles retrying a connection when a time penalty is present.
     *
     * @param data - The data for connecting to the API.
     * @param penaltyResponse - The response data.
     *
     * @returns A promise that resolves to the response data.
     */
    handleConnectRetry = async (
        data: AccessTokenRequestBody,
        penaltyResponse: PenaltyResponse
    ): Promise<AccessTokenResponse> => {
        if (!isPenaltyResponse(penaltyResponse))
            throw new Error('Did not pass a PenaltyResponse to handleConnectRetry')
        const ticket = penaltyResponse['p-ticket'],
            time = penaltyResponse['p-time'],
            captcha = penaltyResponse['p-captcha']

        if (captcha) {
            throw new Error(
                'Captcha present, cannot retry auth request via third party application. Please try again in an hour.'
            )
        }

        console.log(`[Tradovate]: Time Penalty present. Retrying operation in ${time}s`)

        await waitForMs(time! * 1000)
        return await this.connect({...data, 'p-ticket': ticket})
    }
}
