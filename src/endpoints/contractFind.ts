import { tvGet } from '../utils/service'

export const accountList = async (name: string) => {
    let res

    try {
        res = await tvGet('/contract/find', { name: name })
    } catch (err) {
        console.log('[DevX Trade]: ' + err)
        return err
    }
    return res
}
