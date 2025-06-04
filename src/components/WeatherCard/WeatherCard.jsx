import './WeatherCard.css'
import { useContext } from 'react'
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnit'

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext)
  const timeOfDay = weatherData.isDay ? 'day' : 'night'
  const condition = weatherData.condition || 'clear'

  const backgroundClass = `weather__card--${timeOfDay}-${condition}`

  const iconURL = `https://openweathermap.org/img/wn/${weatherData.iconCode}@2x.png`

  return (
    <section className={`weather__card ${backgroundClass}`}>
      <p className="weather__card-temp">
        {weatherData.temp[currentTemperatureUnit]}&deg;{currentTemperatureUnit}
      </p>
      <img
        src={iconURL}
        alt={weatherData.description}
        className="weather__card-img"
      />
    </section>
  )
}

export default WeatherCard
