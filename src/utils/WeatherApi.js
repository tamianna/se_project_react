import { _checkResponse } from "./api"

const getWeatherType = (temperature) => {
  if (temperature >= 75) {
    return 'hot'
  } else if (temperature >= 60 && temperature < 75) {
    return 'warm'
  } else {
    return 'cold'
  }
}

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000
}

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(_checkResponse)
}

export const filterWeatherData = (data) => {
  const result = {}
  result.city = data.name

  result.temp = {
    F: data.main.temp,
    C: Math.round((data.main.temp - 32) * 5 / 9),
  }
  
  result.type = getWeatherType(result.temp.F)
  result.condition = data.weather[0].main.toLowerCase()
  result.iconId = data.weather[0].id
  result.iconCode = data.weather[0].icon
  result.description = data.weather[0].description
  result.isDay = isDay(data.sys, Date.now())

  return result
}
