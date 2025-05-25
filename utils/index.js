export const toQueryString = (obj) => {
    const params = new URLSearchParams(obj)
    return `?${params.toString()}`
}