import { useState, useEffect } from 'react'
import { getWeather, filterWeatherData } from '../../utils/WeatherApi'
import { myCoordinates, APIkey } from '../../utils/constants'
import { Routes, Route } from 'react-router-dom'
import { handleSubmitButton } from '../../utils/helpers.js'
import { getItems, addItem, deleteItem } from '../../utils/api.js'
import { register, authorize, checkToken } from '../../utils/auth.js'

import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Profile from '../Profile/Profile.jsx'
import Footer from '../Footer/Footer'
import AddItemModal from '../AddItemModal/AddItemModal.jsx'
import ItemModal from '../ItemModal/ItemModal'
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnit.jsx'
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal.jsx'
import RegisterModal from '../RegisterModal/RegisterModal.jsx'
import LoginModal from '../LoginModal/LoginModal.jsx'

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
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isCanceling, setIsCanceling] = useState(false)

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

  const handleAddItemSubmit = (item, e) => {
    handleSubmitButton(
      setIsLoading,
      () =>
        new Promise((resolve, reject) => {
          addItem(item)
            .then((newItem) => {
              setClothingItems([newItem, ...clothingItems])
              closeActiveModal()
              setTimeout(resolve, 500)
            })
            .catch((err) => {
              console.error(err)
              reject(err)
            })
        }),
      {
        event: e,
        loadingText: 'Adding...',
        resetForm: true,
      }
    )
  }

  const handleCardDelete = (e) => {
    e.preventDefault()
    if (!cardToDelete || !cardToDelete._id) return

    handleSubmitButton(
      setIsDeleting,
      () =>
        new Promise((resolve, reject) => {
          deleteItem(cardToDelete._id)
            .then(() => {
              const updatedItems = clothingItems.filter(
                (item) => item._id !== cardToDelete._id
              )
              setClothingItems(updatedItems)
              setIsDeleteModalOpen(false)
              closeActiveModal()
              setCardToDelete(null)
              setTimeout(resolve, 500)
            })
            .catch((err) => {
              console.error(err)
              reject(err)
            })
        }),
      {
        event: e,
        loadingText: 'Deleting...',
        resetForm: false,
      }
    )
  }

  const handleCancel = (evt) => {
    handleSubmitButton(
      setIsCanceling,
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            closeActiveModal()
            resolve()
          }, 500)
        }),
      {
        event: evt,
        loadingText: 'Canceling...',
        resetForm: false,
      }
    )
  }

  const closeActiveModal = () => {
    setActiveModal('')
    setIsDeleteModalOpen(false)
  }

  const openConfirmationModal = (card) => {
    setCardToDelete(card)
    setIsDeleteModalOpen(true)
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
                  handleAddClick={handleAddClick}
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
          isLoading={isLoading}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          closeActiveModal={closeActiveModal}
          onConfirmDelete={openConfirmationModal}
        />
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={handleCancel}
          onConfirm={handleCardDelete}
          isDeleting={isDeleting}
          isCanceling={isCanceling}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  )
}

export default App
