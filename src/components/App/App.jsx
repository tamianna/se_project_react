import { useState, useEffect } from 'react'
import { getWeather, filterWeatherData } from '../../utils/WeatherApi'
import { myCoordinates, APIkey } from '../../utils/constants'

import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import ItemModal from '../ItemModal/ItemModal'
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnit.jsx'

function App() {
  const [weatherData, setWeatherData] = useState({
    type: '',
    temp: { F: 999, C: 999 },
    city: '',
  })
  const [activeModal, setActiveModal] = useState('')
  const [selectedCard, setSelectedCard] = useState({})
  const [currentDate, setCurrentDate] = useState('')
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false)
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F')

  useEffect(() => {
    const today = new Date().toLocaleString('defualt', {
      month: 'long',
      day: 'numeric',
    })
    setCurrentDate(today)
  }, [])

  useEffect(() => {
    getWeather(myCoordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data)
        setWeatherData(filteredData)
      })
      .catch(console.error)
  }, [])

  const handleCardClick = (card) => {
    setActiveModal('preview')
    setSelectedCard(card)
  }

  const handleAddClick = () => {
    setActiveModal('add-garment')
    setIsMobileMenuOpened(false)
  }

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === 'F'
      ? setCurrentTemperatureUnit('C')
      : setCurrentTemperatureUnit('F');
  }

  const closeActiveModal = () => {
    setActiveModal('')
  }

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            currentDate={currentDate}
            weatherData={weatherData}
            isMobileMenuOpened={isMobileMenuOpened}
            setIsMobileMenuOpened={setIsMobileMenuOpened}
          />
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        </div>
        <Footer />

        <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          isOpen={activeModal === 'add-garment'}
          closeActiveModal={closeActiveModal}
        >
          <label htmlFor="name" className="modal__label">
            Name
            <input
              id="name"
              type="text"
              placeholder="Name"
              className="modal__input"
            />
          </label>
          <label htmlFor="image" className="modal__label">
            Image
            <input
              id="image"
              type="url"
              className="modal__input"
              placeholder="Image URL"
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">
              Select the weather type:
              <label htmlFor="hot" className="modal__label modal__radio-label">
                <input
                  id="hot"
                  name="radio-buttons"
                  type="radio"
                  className="modal__radio-input"
                />
                <span>Hot</span>
              </label>
              <label htmlFor="warm" className="modal__label modal__radio-label">
                <input
                  id="warm"
                  name="radio-buttons"
                  type="radio"
                  className="modal__radio-input"
                />
                <span>Warm</span>
              </label>
              <label htmlFor="cold" className="modal__label modal__radio-label">
                <input
                  id="cold"
                  name="radio-buttons"
                  type="radio"
                  className="modal__radio-input"
                />
                <span>Cold</span>
              </label>
            </legend>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          closeActiveModal={closeActiveModal}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  )
}

export default App
