import { useEffect, useState } from "react"
import axios from 'axios'

const Weather = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null)
  const latitude = country.capitalInfo.latlng[0]
  const longitude = country.capitalInfo.latlng[1]
  const capitalName = country.capital[0]

  useEffect(() => {
    const api_key = import.meta.env.VITE_WEATHER_API_KEY
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`)
    .then(response => setWeatherData(response.data))
  }, [country.id]);

   if (!weatherData) {
    return <div>Loading weather...</div>;
  }

  return (
    <div>
      <h2>Weather in {capitalName}</h2>
      <div>Temperature {weatherData.main.temp} Celscius</div>
      <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
      <div>Wind {weatherData.wind.speed} m/s</div>
    </div>
  )
}

export default Weather