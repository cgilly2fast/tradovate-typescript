import {tvGet, tvPost} from "../utils/service"
import { getAccessToken, setAccessToken, tokenIsValid, setAvailableAccounts, tokenNearExpiry } from '../utils/storage'
import { waitForMs } from '../utils/wait'


export const connect = async (data: any) => {
    const { token, expiration } = getAccessToken()
    if(token && expiration && tokenIsValid(expiration) && !tokenNearExpiry(expiration)) {
        console.log('[DevX Trader]: Already have an access token. Using existing token.')
        return
    }
   
    const authResponse = await tvPost('/auth/accesstokenrequest', data, false)
    if(authResponse['p-ticket']) {
        return await handleRetry(data, authResponse) 
    } else {
        const { errorText, accessToken, mdAccessToken, userId, userStatus, name, expirationTime } = authResponse
        //console.log(authResponse)
        if(errorText) {
            console.error("[DevX Trader]: " +errorText)
            return
        }
      
        setAccessToken(accessToken, mdAccessToken, expirationTime)

        const accounts = await tvGet('/account/list')

        //console.log("[DevX Trader]: " +JSON.stringify(accounts))

        setAvailableAccounts(accounts)

        console.log(`[DevX Trader]: Successfully stored access token ${accessToken} for user {name: ${name}, ID: ${userId}, status: ${userStatus}}.`)
        return authResponse
    }
}



const handleRetry = async (data:any, json:any) => {
    const ticket    = json['p-ticket'],
          time      = json['p-time'],
          captcha   = json['p-captcha']

    if(captcha) {
        console.error('[DevX Trader]: Captcha present, cannot retry auth request via third party application. Please try again in an hour.')
        return
    }

    console.log(`[DevX Trader]: Time Penalty present. Retrying operation in ${time}s`)

    await waitForMs(time * 1000) 
    await connect({ ...data, 'p-ticket': ticket })   
}