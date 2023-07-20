export function onProductFound(type:any, prevState:any, payload:any) {
    const {data} = payload
    if(!data) {
        return { state: { ...prevState }, effects: [] }
    }
    else {
        const { entity } = data

        return {
            state: {
                ...prevState,
                product: entity,
            },
            effects: [{ event: `${type}/draw` }]
        }
    }
}
