
 const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Error: ${res.status}`);
}

export const getWeather = ({ latitude, longitude }, APIKey) => {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
    ).then(checkResponse);
};