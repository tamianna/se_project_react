import WeatherCard from "../WeatherCard/WeatherCard";

function Main() {
    return (
        <main>
        <WeatherCard />
        <section className="main__container">
            <p className="main__text">Today is 75 &deg; F / You may want to wear:</p>
            {/* Add card section. */}
        </section>
        </main>
    )
}

export default Main;