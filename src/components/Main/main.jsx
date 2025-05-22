import WeatherCard from "../WeatherCard/WeatherCard";

function Main() {
    return (
        <main>
        <WeatherCard />
        <section className="cards">
            <p className="cards__text">Today is 75 &deg; F / You may want to wear:</p>
            {/* Add card section. */}
        </section>
        </main>
    )
}

export default Main;