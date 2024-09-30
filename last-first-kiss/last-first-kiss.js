const first = (Array) => {
    const [first, , ...rest] = Array;
    return first
}
const last = (Array) => {
    const [first, , ...rest] = Array
    return rest.pop()
}
const Kiss = (Array) => [Array[0] , Array[Array.length-1]]