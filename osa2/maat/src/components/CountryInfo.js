import {useState, useEffect} from 'react'
import axios from 'axios'

const Language = ({language}) => {
    return(
        <li>{language}</li>
    )
}
const CountryInfo = ({country}) => {
    return(
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area} </p>
            <p style={{fontWeight:'bold'}}>Languages:</p>
            <ul>
                {Object.values(country.languages).map(lang => 
                    <Language key={lang} language={lang} />)}
            </ul>
            <img src={country.flags.png} alt=''/>
            <WeatherData country={country}/>
        </div>
    )
}

const WeatherData = ({country}) => {
    const [weatherData, setWeatherData] = useState()
    
    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
        .then((response) => {
            console.log('response from api call for weather data')
            console.log(response.data.name)
            console.log('')
            setWeatherData(response.data)
        })
    },[country]
    )
    
        if(weatherData){
            return(
                <div>
                <h2>Weather in {`${country.capital}`}</h2>
                <p>temperature {weatherData.main.temp} Celsius</p>
                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt=''/>
                <p>wind {weatherData.wind.speed} m/s</p>
            </div>
        )    
    } else {
        return(
            <></>
        )
    }
}

export default CountryInfo