import './Main.css'
import { useContext, useState, useEffect } from 'react'

import WeatherCard from '../WeatherCard/WeatherCard'
import ItemCard from '../ItemCard/ItemCard'
import random from '../../images/random.svg'
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnit'

function shuffleItems(items = []) {
  const shuffled = [...items]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function Main({ weatherData, handleCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext)

  const filteredItems = clothingItems.filter(
    (item) =>
      item.weather?.toLowerCase() === weatherData.type?.toLowerCase() ||
      !weatherData.type
  )

  const [shuffledItems, setShuffledItems] = useState([])

  useEffect(() => {
    setShuffledItems(filteredItems)
  }, [weatherData, clothingItems])

  const handleRandomClick = () => {
    setShuffledItems(shuffleItems(filteredItems))
  }

  return (
    <main>
      {weatherData.temp.F !== 999 && <WeatherCard weatherData={weatherData} />}
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}&deg;
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__lists">
          {shuffledItems.length > 0 ? (
            shuffledItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            ))
          ) : (
            <p className="cards__lists_fallback-text">
              No items available for this weather.
            </p>
          )}
        </ul>
        <button
          className="cards__random-button"
          type="button"
          onClick={handleRandomClick}
        >
          <img src={random} alt="Random icon." className="random-icon" />
          Randomize
        </button>
      </section>
    </main>
  )
}

export default Main
