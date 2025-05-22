import sunny from "../../images/sunny.svg"

function WeatherCard() {
    return (
        <section className="weather_card">
            <p className="weather__card-temp">75</p>
            <img src={sunny} alt="Sunny skies." className="weather__card-logo" />
        </section>
    )
}

export default WeatherCard;