import React, {useState, useEffect} from 'react'
import axios from 'axios'
const weatherStack = 'http://api.weatherstack.com/'

const SpecificView = ({country, values}) => {

    const key = process.env.REACT_APP_MY_KEY
    const [weatherData, setWeatherData] = useState({})

    useEffect(() => {
            axios.get(`${weatherStack}current?access_key=${key}&query=${country.capital[0]}`)
            .then(response => setWeatherData(response.data))
            }, [])


    // Mikäli WeatherStackista ei saada dataa esimerkiksi API-avaimen puuttuessa,
    // palautetaan sama komponentti ilman WeatherStack-dataa.
    if (Object.keys(weatherData).length === 0 || weatherData.success === false) {
        return(
            <div>
            <h2>{country.name.common}</h2>
            <div>Capital: {country.capital[0]}</div>
            <div>Population: {country.population}</div>
            <h3>Languges</h3>
            <ul>
                {values.map((props) => <li key={props}>{props}</li>)}
            </ul>
            <img src={country.flags.png} alt="Flag of the country"></img>
            </div>
        )
    }

    return(
        <div>
        <h2>{country.name.common}</h2>
        <div>Capital: {country.capital[0]}</div>
        <div>Population: {country.population}</div>
        <h3>Languges</h3>
        <ul>
            {values.map((props) => <li key={props}>{props}</li>)}
        </ul>
        <img src={country.flags.png} alt="Flag of the country"></img>
        <div>
            <h3>Weather in {weatherData.location.name}</h3>
            <div>
                <strong>Temperature: </strong> {weatherData.current.temperature}
            </div>
            <div>
                <img src={weatherData.current.weather_icons[0]} alt={`Flag of ${country.name.common}`}/>
            </div>
            <div>
                <strong>Wind: </strong> {weatherData.current.wind_speed} mph direction {weatherData.current.wind_degree}{weatherData.current.wind_dir}
            </div>
        </div>
        </div>
    )

}

export default SpecificView
