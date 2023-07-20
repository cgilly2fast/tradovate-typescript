import { tvGet } from "../utils/service"

export const accountList = async () =>{
    return await tvGet('/account/list')
}