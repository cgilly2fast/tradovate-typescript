import { AccessToken, STORAGE_KEYS, Account } from './types'



export type TradovateAccountMini = {
    id: number
    name: string
    userId: number
}

export const setDeviceId = (id: string) => {
    sessionStorage.setItem(STORAGE_KEYS.DEVICE_ID_KEY, id)
}

export const getDeviceId = () => {
    return sessionStorage.getItem(STORAGE_KEYS.DEVICE_ID_KEY)
}

export const setAvailableAccounts = (accounts: Account[]) => {
    process.env.AVAIL_ACCTS = JSON.stringify(accounts)
    process.env.ID = accounts[0].id as unknown as string
    process.env.SPEC = accounts[0].name
    process.env.USER_ID = accounts[0].userId as unknown as string
}

/**
 * Returns and array of available accounts or undefined.
 * @returns Account[]
 */
export const getAvailableAccounts = (): Account[] => {
    return JSON.parse(process.env.AVAIL_ACCTS!)
}

/**
 * Returns and array of available accounts or undefined.
 * @returns Account
 */
export const getCurrentAccount = (): TradovateAccountMini => {
    return {
        id: parseInt(process.env.ID!),
        name: process.env.SPEC!,
        userId: parseInt(process.env.USER_ID!),
    }
}

/**
 * Use a predicate function to find an account. May be undefined.
 */
export const queryAvailableAccounts = (predicate: any) => {
    return getAvailableAccounts().find(predicate)
}

export const setAccessToken = (
    token: string,
    md_token: string,
    expiration: string,
) => {
    //if(!token || !expiration) throw new Error('[DevX Trader]: Attempted to set undefined token')
    process.env.ACCESS_TOKEN = token
    process.env.MD_ACCESS_TOKEN = md_token
    process.env.EXPIRATION_KEY = expiration
}

export const getAccessToken = (): AccessToken => {
    const token = process.env.ACCESS_TOKEN
    const expiration = process.env.EXPIRATION_KEY
    if (!token) {
        console.warn(
            '[DevX Trader]: No access token retrieved. Please request an access token.',
        )
    }
    return { token, expiration }
}

export const tokenIsValid = (expiration: string): boolean => {
    return (
        new Date(expiration).getMilliseconds() - new Date().getMilliseconds() >
        0
    )
}

export const tokenNearExpiry = (expiration: string): boolean => {
    return (
        new Date(expiration).getMilliseconds() - new Date().getMilliseconds() <
        10 * 60 * 1000
    )
}

export const setUserData = (data: any) =>
    (process.env.USER_DATA = JSON.stringify(data))
export const getUserData = (): any => {
    return JSON.parse(process.env.USER_DATA!)
}

export function stringify(...obj:any[]) {
    return JSON.stringify(obj, null, 2);
  }