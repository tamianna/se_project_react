import "./WeatherCard.css"

function WeatherCard({ weatherData }) {
    const timeOfDay = weatherData.isDay ? "day" : "night";
    const condition = weatherData.condition || "clear";

    const backgroundClass = `weather__card--${timeOfDay}-${condition}`;

    const iconURL = `https://openweathermap.org/img/wn/${weatherData.iconCode}@2x.png`;

    return (
        <section className={`weather__card ${backgroundClass}`}>
            <p className="weather__card-temp">{weatherData.temp.F}&deg;F </p>
            <img 
            src={iconURL}
            alt={weatherData.description}
            className="weather__card-img"
            />
        </section>
    )
}

export default WeatherCard;