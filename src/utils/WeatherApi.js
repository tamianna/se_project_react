
 const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Error: ${res.status}`);
};

    const getWeatherType = (temperature) => {
    if (temperature >= 75) {
        return "hot";
    } else if (temperature >= 60 && temperature < 75) {
        return "warm";
    } else {
        return "cold";
    }
};

export const getWeather = ({ latitude, longitude }, APIkey) => {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
    ).then(checkResponse);
};

export const filterWeatherData = (data) => {
    const result = {};
    result.city = data.name;
    result.temp = { F: data.main.temp};
    result.type = getWeatherType(result.temp.F);

    return result;
};