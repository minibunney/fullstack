import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = () => {
    const req = axios.get(baseUrl + "/api/all")
    return req.then(response => {
        console.log("services.countries.getAll.response", response)
        return response.data
    })
        .catch(error => { return { error: "get" } })
}

const create = newObject => {
    const req = axios.post(baseUrl, newObject)
    return req.then(response => response.data).catch(error => { return { error: "create" } })
}

const update = (id, newObject) => {
    const req = axios.put(`${baseUrl}/${id}`, newObject)
    return req.then(response => {
        console.log("put return response", response)
        return response.data
    }).catch(error => {
        console.log("put return error", error)
        return { error: "update" }
    })
}

const remove = (id) => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(response => response.data).catch(error => { return { error: "remove" } })
}

export default {
    getAll: getAll,
    create: create,
    update: update,
    remove: remove,
}