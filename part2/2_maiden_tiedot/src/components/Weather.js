import openWeather from "../services/openWeather"
import { useState, useEffect } from 'react'

const Weather = ({ country }) => {
    //console.log("components.weather", country)
    const [weatherData, setWeatherData] = useState(null)

    const api_key = process.env.REACT_APP_API_KEY
    const params = new URLSearchParams(
        [
            ['appid', api_key],
            ['q', country.capital[0]],
            ['units', 'metric'],
            ['type', 'accurate'],
        ]
    )

    useEffect(() => {
        openWeather
            .getWeather(params)
            .then(response => {
                //console.log("app.useEffect.countries.length", countries.length)
                setWeatherData(response)
                //console.log('services.openWeather', response)
            }).catch(error => console.log("error getall", error))
    }, [])

    return (
        <>
            {(weatherData) &&
                <>
                    <h4>Weather in {country.capital[0]} </h4>
                    <p><span role="img" aria-label='temperature'>🌡️</span> {weatherData.list[0].main.temp}</p>
                    <img src={'https://openweathermap.org/img/wn/' + weatherData.list[0].weather[0].icon + '@2x.png'} alt='weather icon'></img>
                    <p><span role="img" aria-label='wind'>🍃</span> {weatherData.list[0].wind.speed} m/s from {weatherData.list[0].wind.deg}°</p>
                </>
            }
        </>
    )
}

export default Weather