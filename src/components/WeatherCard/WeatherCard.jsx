import "./WeatherCard.css"
import sunny from "../../images/sunny.svg"

function WeatherCard() {
    return (
        <section className="weather__card">
            <p className="weather__card-temp">75&deg;F </p>
            <img src={sunny} alt="Sunny skies." className="weather__card-img" />
        </section>
    )
}

export default WeatherCard;