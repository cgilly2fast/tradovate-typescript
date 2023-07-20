export const waitForMs = (t:any) => {
    return new Promise((res:any) => {
        setTimeout(() => {
            res()
        }, t)
    })
}

export const waitUntil =  (pred:any) =>{
    return new Promise(async (res:any) =>{
        while(!pred()) {
            await waitForMs(100)
        }
        res()
    })
}