import { tvGet } from "../utils/service"

export const contractSuggest = async (name:string) =>{
    let res 
    
    try {
        res = await tvGet( "/contract/suggest", {name:name})
    } catch(err:any) {
        console.log("[DevX Trade]: "+ err)
        return err
    }
    return res
}