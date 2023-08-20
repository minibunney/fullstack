const saveToLocal = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value))
}
const getFromLocal = (key) => {
    return JSON.parse(window.localStorage.getItem(key))
}
const removeFromLocal = (key) => {
    try {
        window.localStorage.removeItem(key)
    } catch (error) {
        //console.log("services.removeFromLocal", error)
        return false
    }
    return true
}
const clearLocal = () => {
    //console.log("clearLocal")
    window.localStorage.clear()
}

export default { saveToLocal, getFromLocal, removeFromLocal, clearLocal }