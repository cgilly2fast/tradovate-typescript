import crypto from 'crypto';

const deviceId = crypto.createHash('sha256')     //creates an instance of hasher
    .update(process.platform)   //adds the platform to the hash ('windows', 'android', ...)
    .update(process.arch)       //adds the cpu architecture to the hash ('x64', ...)
    .update(process.env.TV_USER!+"")   //adds your tradovate username to the hash
    .digest('hex')              //creates a hash 'digest' - the result of the algo as a hex string

export const credentials = {
    name:      process.env.TV_USER,
    password:   process.env.TV_PASSWORD,
    appId:      process.env.TV_APP_ID,
    appVersion: "0.0.1",
    deviceId,
    cid:        process.env.TV_CID,
    sec:        process.env.TV_SECRET
}

export const URLs = {
    DEMO_URL:       "https://demo.tradovateapi.com/v1",
    LIVE_URL:       'https://live.tradovateapi.com/v1',
    MD_URL:         'wss://md.tradovateapi.com/v1/websocket',
    WS_DEMO_URL:    'wss://demo.tradovateapi.com/v1/websocket',
    WS_LIVE_URL:    'wss://live.tradovateapi.com/v1/websocket',
    REPLAY_URL:     'wss://replay.tradovateapi.com/v1/websocket'
}