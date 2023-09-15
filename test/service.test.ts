import * as dotenv from 'dotenv'
dotenv.config({path: './test/.env.test'})
import TradovateService from '../src/service'
import crypto from 'crypto'
import {
    AccessTokenRequestBody,
    AccessTokenResponse,
    Account,
    isPenaltyResponse
} from '../src/types'
import {Storage} from '../src'

describe('TradovateService', () => {
    let originalConsoleLog: any
    let originalConsoleWarn: any
    let service: TradovateService
    const storage = Storage.getInstance()
    const deviceId = crypto
        .createHash('sha256')
        .update(process.platform)
        .update(process.arch)
        .update(process.env.TV_USER! + '')
        .digest('hex')

    const credentials: AccessTokenRequestBody = {
        name: process.env.TV_USER!,
        password: process.env.TV_PASSWORD!,
        appId: process.env.TV_APP_ID,
        appVersion: '1.0.2',
        deviceId,
        cid: process.env.TV_CID,
        sec: process.env.TV_SECRET
    }

    beforeEach(() => {
        originalConsoleLog = console.log
        originalConsoleWarn = console.warn
        console.log = jest.fn()
        console.warn = jest.fn()
        service = new TradovateService()
        storage.clear()
    })

    afterEach(() => {
        console.log = originalConsoleLog
        console.warn = originalConsoleWarn
        storage.clear()
    })

    it('should make a tradovate POST request successfully', async () => {
        const authResponse = await service.post(
            'auth/accesstokenrequest',
            credentials,
            false,
            false
        )

        expect(authResponse).toHaveProperty('accessToken')
        expect(authResponse).toHaveProperty('mdAccessToken')
        expect(authResponse).toHaveProperty('expirationTime')
    })

    it('should handle POST request errors', async () => {
        try {
            await service.post('orderStrategy/interruptorderstrategy', {
                orderStrategyId: 0
            })

            expect(true).toBe(false)
        } catch (error) {
            //@ts-ignore
            expect(error.message).toBe(
                'service.post AxiosError: Request failed with status code 404'
            )
        }
    })

    it('should receive a demo Tradovate access token', async () => {
        const accessToken = await service.connect(credentials, false)

        expect(accessToken).toHaveProperty('accessToken')
        expect(accessToken).toHaveProperty('mdAccessToken')
        expect(accessToken).toHaveProperty('expirationTime')
        expect({
            accessToken: accessToken.accessToken,
            expirationTime: accessToken.expirationTime
        }).toEqual(storage.getAccessToken())
        expect({
            mdAccessToken: accessToken.mdAccessToken,
            expirationTime: accessToken.expirationTime
        }).toEqual(storage.getMdAccessToken())
    })

    it('should receive a live Tradovate access token', async () => {
        const accessToken = await service.connect(credentials, true)

        expect(accessToken).toHaveProperty('accessToken')
        expect(accessToken).toHaveProperty('mdAccessToken')
        expect(accessToken).toHaveProperty('expirationTime')
        expect({
            accessToken: accessToken.accessToken,
            expirationTime: accessToken.expirationTime
        }).toEqual(storage.getAccessToken())
        expect({
            mdAccessToken: accessToken.mdAccessToken,
            expirationTime: accessToken.expirationTime
        }).toEqual(storage.getMdAccessToken())
    })

    it('should not request another Tradovate access token if a valid one is already stored', async () => {
        const accessToken = await service.connect(credentials, false)

        expect(accessToken).toHaveProperty('accessToken')
        expect(accessToken).toHaveProperty('mdAccessToken')
        expect(accessToken).toHaveProperty('expirationTime')
        expect({
            accessToken: accessToken.accessToken,
            expirationTime: accessToken.expirationTime
        }).toEqual(storage.getAccessToken())
        expect({
            mdAccessToken: accessToken.mdAccessToken,
            expirationTime: accessToken.expirationTime
        }).toEqual(storage.getMdAccessToken())
        const secondToken = await service.connect(credentials, false)
        expect(secondToken).toHaveProperty('accessToken')
        expect(secondToken).toHaveProperty('expirationTime')
        expect(secondToken).toHaveProperty('userId')
        expect(secondToken).toHaveProperty('name')
    })

    it('should make a GET request successfully', async () => {
        await service.connect(credentials)

        const response = await service.get('account/list')
        const value = isPenaltyResponse(response)
        expect(value).toBe(false)
        expect(Array.isArray(response)).toBe(true)
        expect((response as Account[])[0]).toHaveProperty('id')
        expect((response as Account[])[0]).toHaveProperty('name')
        expect((response as Account[])[0]).toHaveProperty('accountType')
        expect((response as Account[])[0]).toHaveProperty('active')
    })

    it('should handle GET request errors', async () => {
        try {
            await await service.get('contract/find', {name: ''})

            expect(true).toBe(false)
        } catch (error) {
            //@ts-ignore
            expect(error.message).toBe(
                'service.get AxiosError: Request failed with status code 404'
            )
        }
    })

    it('should successfully renew the access token when needed', async () => {
        const access = await service.connect(credentials)

        //Set expiration to 3 mins away for testing purposes
        const nearExpiry = new Date().getTime() + 3 * 60 + 1000

        storage.setAccessToken(
            access.accessToken!,
            access.mdAccessToken!,
            new Date(nearExpiry).toISOString()
        )

        const renewedToken = await service.renewAccessToken()
        const value = isPenaltyResponse(renewedToken)
        expect(value).toBe(false)
        expect(renewedToken).toBeDefined()
        expect(
            new Date((renewedToken as AccessTokenResponse).expirationTime!).getTime()
        ).toBeGreaterThan(nearExpiry)
    })

    it('should handle errors when renewing access token', async () => {
        try {
            await service.renewAccessToken()
            expect(true).toBe(false)
        } catch (error) {
            //@ts-ignore
            expect(error.message).toBe(
                'No active token to renew: Error: service.get AxiosError: Request failed with status code 404'
            )
        }
    })

    it('should correctly handle renew token time penalties and retry operations', async () => {
        const access = await service.connect(credentials)
        //Set expiration to 3 mins away for testing purposes
        const nearExpiry = new Date().getTime() + 3 * 60 + 1000

        storage.setAccessToken(
            access.accessToken!,
            access.mdAccessToken!,
            new Date(nearExpiry).toISOString()
        )

        const renewedToken = await service.handleRenewRetry(false, {
            'p-ticket': '12345',
            'p-time': 2,
            'p-captcha': false
        })

        const value = isPenaltyResponse(renewedToken)
        expect(value).toBe(false)
        expect(renewedToken).toBeDefined()
        expect(
            new Date((renewedToken as AccessTokenResponse).expirationTime!).getTime()
        ).toBeGreaterThan(nearExpiry)
    })

    it('should throw an error if a captcha is present during renewal retry', async () => {
        await service.connect(credentials)

        try {
            await service.handleRenewRetry(false, {
                'p-ticket': '12345',
                'p-time': 2,
                'p-captcha': true
            })
            // Fail the test if it doesn't throw an error
            expect(true).toBe(false)
        } catch (error) {
            //@ts-ignore
            expect(error.message).toBe(
                'Captcha present, cannot retry auth request via third party application. Please try again in an hour.'
            )
        }
    })

    it('should correctly handle new token time penalties and retry operations', async () => {
        const accessToken = await service.handleConnectRetry(credentials, {
            'p-ticket': '12345',
            'p-time': 2,
            'p-captcha': false
        })
        const value = isPenaltyResponse(accessToken)
        expect(value).toBe(false)
        expect(accessToken).toHaveProperty('accessToken')
        expect(accessToken).toHaveProperty('mdAccessToken')
        expect(accessToken).toHaveProperty('expirationTime')
        expect({
            accessToken: (accessToken as AccessTokenResponse).accessToken,
            expirationTime: (accessToken as AccessTokenResponse).expirationTime
        } as AccessTokenResponse).toEqual(storage.getAccessToken())
        expect({
            mdAccessToken: (accessToken as AccessTokenResponse).mdAccessToken,
            expirationTime: (accessToken as AccessTokenResponse).expirationTime
        }).toEqual(storage.getMdAccessToken())
    })

    it('should throw an error if a captcha is present during new token retry', async () => {
        try {
            await service.handleConnectRetry(credentials, {
                'p-ticket': '12345',
                'p-time': 2,
                'p-captcha': true
            })
            // Fail the test if it doesn't throw an error
            expect(true).toBe(false)
        } catch (error) {
            //@ts-ignore
            expect(error.message).toBe(
                'Captcha present, cannot retry auth request via third party application. Please try again in an hour.'
            )
        }
    })
})
