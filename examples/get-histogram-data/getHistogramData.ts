import 'dotenv/config'
import crypto from 'crypto'
import {TradovateService, MarketDataSocket, AccessTokenRequestBody} from '../../src'

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
    appVersion: '1.0.0',
    deviceId,
    cid: process.env.TV_CID,
    sec: process.env.TV_SECRET
}

const service = new TradovateService()

const mdSocket = new MarketDataSocket()

async function main() {
    await service.connect(credentials)

    await mdSocket.connect()

    mdSocket.subscribeHistogram('ESU3', item => {
        console.log(item)
    })

    setTimeout(() => {
        mdSocket.disconnect()
    }, 30 * 60 * 1000)
}

main()
