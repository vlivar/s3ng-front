export function getTokenFromLocalStorage() {
    const data = localStorage.getItem("accessToken")
    const token = data ? JSON.parse(data) : ""
    return token
}

export function setTokenToLocalStorage(key, token) {
    localStorage.setItem(key, JSON.stringify(token))
}

export function removeTokenToLocalStorage(key) {
    localStorage.removeItem(key)
}