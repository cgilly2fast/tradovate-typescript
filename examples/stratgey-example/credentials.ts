import crypto from 'crypto'
import {AccessTokenRequestBody} from '../../src'

const deviceId = crypto
    .createHash('sha256') //creates an instance of hasher
    .update(process.platform) //adds the platform to the hash ('windows', 'android', ...)
    .update(process.arch) //adds the cpu architecture to the hash ('x64', ...)
    .update(process.env.TV_USER! + '') //adds your tradovate username to the hash
    .digest('hex') //creates a hash 'digest' - the result of the algo as a hex string

export const credentials: AccessTokenRequestBody = {
    name: process.env.TV_USER!,
    password: process.env.TV_PASSWORD!,
    appId: process.env.TV_APP_ID,
    appVersion: '1.0.2',
    deviceId,
    cid: process.env.TV_CID,
    sec: process.env.TV_SECRET
}
