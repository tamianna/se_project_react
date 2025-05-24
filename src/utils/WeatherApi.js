
 const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Error: ${res.status}`);
}

export const getWeather = ({ latitude, longitude }, APIkey) => {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
    ).then(checkResponse);
};

export const filterWeatherData = (data) => {
      console.log("API Weather Data:", data.weather[0].main);
      console.log("Temperature:", data.main.temp);
    const result = {};
    result.city = data.name;

    if (data.main.temp >= 75) {
        result.type = "hot";
    } else if (data.main.temp >= 60 && data.main.temp < 75) {
        result.type = "warm";
    } else {
        result.type = "cold";
    }

    return result;
};