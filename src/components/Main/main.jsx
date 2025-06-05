import './Main.css'
import { useContext } from 'react'
import { defaultClothingItems } from '../../utils/constants'

import WeatherCard from '../WeatherCard/WeatherCard'
import ItemCard from '../ItemCard/ItemCard'
import random from '../../images/random.svg'
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnit'

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext)

  return (
    <main>
      {weatherData.temp.F !== 999 && <WeatherCard weatherData={weatherData} />}
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}&deg;
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__lists">
          {clothingItems
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
