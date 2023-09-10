import {tvGet} from './service'

export const accountList = async () => {
    return await tvGet('/account/list')
}
