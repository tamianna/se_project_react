import { useState, useEffect } from 'react'
import { getWeather, filterWeatherData } from '../../utils/WeatherApi'
import { myCoordinates, APIkey } from '../../utils/constants'
import { Routes, Route } from 'react-router-dom'

import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Profile from '../Profile/Profile.jsx'
import Footer from '../Footer/Footer'
import AddItemModal from '../AddItemModal/AddItemModal.jsx'
import ItemModal from '../ItemModal/ItemModal'
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnit.jsx'
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal.jsx'
import { getItems, addItem, deleteItem } from '../../utils/api.js'

function App() {
  const [weatherData, setWeatherData] = useState({
    type: '',
    temp: { F: 999, C: 999 },
    city: '',
  })
  const [clothingItems, setClothingItems] = useState([])
  const [activeModal, setActiveModal] = useState('')
  const [selectedCard, setSelectedCard] = useState({})
  const [currentDate, setCurrentDate] = useState('')
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false)
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [cardToDelete, setCardToDelete] = useState(null)

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

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data)
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
      : setCurrentTemperatureUnit('F')
  }

  const handleAddItemSubmit = (item) => {
    addItem(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems])
        closeActiveModal()
      })
      .catch(console.error)
  }

  const handleCardDelete = () => {
    if (!cardToDelete || !cardToDelete._id) return

    deleteItem(cardToDelete._id)
      .then(() => {
        const updatedItems = clothingItems.filter(
          (item) => item._id !== cardToDelete._id
        )

        setClothingItems(updatedItems)
        setIsDeleteModalOpen(false)
        setActiveModal('')
        setCardToDelete(null)
      })
      .catch(console.error)
  }

  const closeActiveModal = () => {
    setActiveModal('')
    setIsDeleteModalOpen(false)
  }

  const openConfirmationModal = (card) => {
    setCardToDelete(card)
    setIsDeleteModalOpen(true)
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
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                />
              }
            />
          </Routes>
        </div>
        <Footer />

        <AddItemModal
          isOpen={activeModal === 'add-garment'}
          onAddItem={handleAddItemSubmit}
          onCloseModal={closeActiveModal}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          closeActiveModal={closeActiveModal}
          onConfirmDelete={openConfirmationModal}
        />
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={closeActiveModal}
          onConfirm={handleCardDelete}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  )
}

export default App
