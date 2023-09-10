import {tvGet} from './service'

export const contractSuggest = async (name: string) => {
    let res

    try {
        res = await tvGet('/contract/suggest', {name: name})
    } catch (err) {
        console.log('[DevX Trade]: ' + err)
        return err
    }
    return res
}
