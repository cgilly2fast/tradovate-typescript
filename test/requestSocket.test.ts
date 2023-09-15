import * as dotenv from 'dotenv'
dotenv.config({path: './test/.env.test'})
import crypto from 'crypto'
import {
    ResponseMsg,
    TradovateService,
    URLs,
    isResponseMsg,
    AccessTokenRequestBody,
    RequestSocket
} from '../src'
import {stringify} from '../src/utils/stringify'

describe('RequestSocket', () => {
    let originalConsoleLog: any
    const service = new TradovateService()
    let requestSocket: RequestSocket
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

    beforeEach(async () => {
        originalConsoleLog = console.log
        console.log = jest.fn()
        requestSocket = new RequestSocket(URLs.WS_DEMO_URL)
        await service.connect(credentials)
    })

    afterEach(() => {
        requestSocket.disconnect()
        console.log = originalConsoleLog
    })

    it('should connect successfully', async () => {
        await requestSocket.connect()

        expect(requestSocket.isConnected()).toBe(true)
    })

    it('should make a successful request', async () => {
        await requestSocket.connect()

        const response = await requestSocket.request({url: 'account/list'})

        expect(isResponseMsg(response)).toBe(true)
        expect((response as ResponseMsg<'account/list'>).d[0]).toHaveProperty('id')
        expect((response as ResponseMsg<'account/list'>).d[0]).toHaveProperty('name')
        expect((response as ResponseMsg<'account/list'>).d[0]).toHaveProperty(
            'accountType'
        )
        expect((response as ResponseMsg<'account/list'>).d[0]).toHaveProperty('active')
    })

    it('should handle errors in request', async () => {
        await requestSocket.connect()

        try {
            //@ts-ignore
            await requestSocket.request({url: 'authorize', body: ''})
            expect(true).toBe(false)
        } catch (error) {
            const item = {s: 404, i: 2, d: '"Not found: authorize"'}
            //@ts-ignore
            expect(error).toBe(
                `WS request: ${stringify({
                    params: {
                        url: 'authorize',
                        query: undefined,
                        body: ''
                    },
                    item
                })}, ${URLs.WS_DEMO_URL}`
            )
        }
    })
})
