import axios from 'axios'
const baseUrl = 'http://api.openweathermap.org/data/2.5/find'




const getWeather = (params) => {
    const req = axios.get(baseUrl, { params })
    return req.then(response => {
        //console.log('services.weather.getWeather.response', response)
        return response.data
    })
        .catch(error => { return { error: 'get' } })
}


export default {
    getWeather: getWeather,
}