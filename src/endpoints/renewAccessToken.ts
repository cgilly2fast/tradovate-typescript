import { tvGet } from "../utils/service"
import { getAccessToken, setAccessToken, tokenIsValid, setAvailableAccounts, tokenNearExpiry } from '../utils/storage'
import { waitForMs } from '../utils/wait'


export const renewAccessToken = async (live:boolean= false) => {
    const { token, expiration } = getAccessToken()
    if(token && expiration && tokenIsValid(expiration) && !tokenNearExpiry(expiration)) {
        console.log('[DevX Trader]: Already have an access token. Using existing token.')
        return
    }

    console.log("[DevX Trader]: Renewing access token...")
    const env = (live? "live": "demo")
    const authResponse = await tvGet('/auth/renewaccesstoken',null, env)
    if(authResponse['p-ticket']) {
        return await handleRetry(env, authResponse) 
    } else {
        const { errorText, accessToken, mdAccessToken, userId, userStatus, name, expirationTime } = authResponse
        
        if(errorText) {
            console.error("[DevX Trader]: Error in token renewal: " +errorText)
            return
        }
      
        setAccessToken(accessToken, mdAccessToken, expirationTime)

        console.log(`[DevX Trader]: Successfully stored RENEWED access token ${accessToken} for user {name: ${name}, ID: ${userId}, status: ${userStatus}}.`)
        return authResponse
    }
}



const handleRetry = async (env:string, json:any) => {
    const ticket    = json['p-ticket'],
          time      = json['p-time'],
          captcha   = json['p-captcha']

    if(captcha) {
        console.error('[DevX Trader]: Captcha present, cannot retry auth request via third party application. Please try again in an hour.')
        return
    }

    console.log(`[DevX Trader]: Time Penalty present. Retrying operation in ${time}s`)

    await waitForMs(time * 1000) 
    await tvGet('/auth/renewaccesstoken',null, env)  
}