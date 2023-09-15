import * as dotenv from 'dotenv'
dotenv.config({path: './test/.env.test'})
import crypto from 'crypto'

import {
    TradovateSocket,
    TradovateService,
    AccessTokenRequestBody,
    RequestSocket,
    URLs
} from '../src'

describe('TradovateSocket', () => {
    let tvSocket: TradovateSocket
    let originalConsoleLog: any
    const service = new TradovateService()
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
        // Create a new instance of TradovateSocket for each test
        tvSocket = new TradovateSocket()
        await service.connect(credentials)
    })

    afterEach(() => {
        if (tvSocket.isConnected()) tvSocket.disconnect()
        console.log = originalConsoleLog
    })

    it('should connect successfully', async () => {
        await tvSocket.connect()
        expect(tvSocket.isConnected()).toBe(true)
    })

    it('should send and receive messages', async () => {
        await tvSocket.connect()

        let success = false
        await tvSocket.synchronize({
            onSubscription: data => {
                if (data.users) {
                    success = true
                }
            }
        })
        expect(success).toBe(true)
    })

    it('should throw error if constructed wrong', async () => {
        try {
            new TradovateSocket(false, new RequestSocket(URLs.MD_URL))
            expect(true).toBe(true)
        } catch (error) {
            //@ts-ignore
            expect(error.message).toBe('RequestSocket passed with an invalid url.')
        }
    })
})
