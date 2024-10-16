const pick = (obj, arr) => {
    let newobj = {}
    if (typeof arr === 'string') arr = arr[arr]
    for (let key of Object.keys(obj)) {
        if (arr.includes(key)) {
            newobj[key] = obj[key]
        }
    }
    return newobj
}

const omit = (obj, arr) => {
    let newobj = {}
    if (typeof arr === 'string') arr = arr[arr]
    for (let key of Object.keys(obj)) {
        if (!arr.includes(key)) {
            newobj[key] = obj[key]
        }
    }
    return newobj
}