import { getAccessToken } from './storage'
import { URLs } from '../config/credentials'
import axios from 'axios';
import { AccessToken } from './types';

const { DEMO_URL, LIVE_URL } = URLs

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
export const tvGet = async (endpoint:string, query: any = null, env = 'demo') => {
    const { token } = getAccessToken()
    try {
        let q = ''
        if(query) {
            q = Object.keys(query).reduce((acc, next, i, arr) => {
                acc += next + '=' + query[next]
                if(i !== arr.length - 1) acc += '&'
                return acc
            }, '?')
        }

        

        let baseURL = env === 'demo' ? DEMO_URL : env === 'live' ? LIVE_URL : ''        
        if(!baseURL) throw new Error(`[Services:tvGet] => 'env' variable should be either 'live' or 'demo'.`)

        let url = query !== null
            ? baseURL + endpoint + q
            : baseURL + endpoint

        console.log("[DevX Trader]: " +url)
        console.log('[DevX Trader]: With query:', q.toString() || '<no query>')
        
        const res = await axios({
            url:url, 
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        

        const results = await res.data
        
        return results

    } catch(err) {
        console.error("[DevX Trader]: tvGet" +err)
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
export const tvPost = async (endpoint:string, data:any, usetoken:boolean = true, env = 'demo') => {
    let accessToken: AccessToken 
    if(usetoken) 
        accessToken = getAccessToken()

    const bearer = usetoken ? { Authorization: `Bearer ${accessToken!.token}` } : {} 

    let baseURL = env === 'demo' ? DEMO_URL : env === 'live' ? LIVE_URL : ''
    if(!baseURL) throw new Error(`[Services:tvPost] => 'env' variable should be either 'live' or 'demo'.`)

    console.log("[DevX Trader]: " +baseURL + endpoint)

    try {
        const res = await axios({
            url: baseURL + endpoint, 
            method: 'POST',
            headers: {
                ...bearer,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            } ,
            data: data
        })

        const results = await res.data
        
        return results

    } catch(err) {
        console.error("[DevX Trader]: tvPost: "+err)
    }
}

// New! Interact with the API via browser console.
// window.tradovate = {
//     get: tvGet,
//     post: tvPost
// }