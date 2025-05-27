import './Main.css'
import WeatherCard from '../WeatherCard/WeatherCard'
import { defaultClothingItems } from '../../utils/constants'
import ItemCard from '../ItemCard/ItemCard'
import random from '../../images/random.svg'

function Main({ weatherData, handleCardClick }) {
  return (
    <main>
      {weatherData.temp.F !== 999 && <WeatherCard weatherData={weatherData} />}
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F}&deg;F / You may want to wear:
        </p>
        <ul className="cards__lists">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              )
            })}
        </ul>
        <button className="cards__random-button">
          <img src={random} alt="Random icon." className="random-icon" />
          Randomize
        </button>
      </section>
    </main>
  )
}

export default Main
