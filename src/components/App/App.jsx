import { useState, useEffect } from 'react'
import { getWeather, filterWeatherData } from '../../utils/WeatherApi'
import { myCoordinates, APIkey } from '../../utils/constants'
import { Routes, Route } from 'react-router-dom'
import { handleSubmitButton } from '../../utils/helpers.js'
import {
  getItems,
  addItem,
  deleteItem,
  updateUser,
  addCardLike,
  removeCardLike,
} from '../../utils/api.js'
import { register, authorize, checkToken } from '../../utils/auth.js'
import { Navigate, useNavigate } from 'react-router-dom'

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
import CurrentUserContext from '../../contexts/CurrentUserContext.jsx'
import EditProfileModal from '../EditProfileModal/EditProfileModal.jsx'

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
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const navigate = useNavigate()

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

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      checkToken(token)
        .then((user) => {
          setIsLoggedIn(true)
          setCurrentUser(user)
        })
        .catch(() => {
          localStorage.removeItem('jwt')
        })
    }
  }, [])

  const handleCardClick = (card) => {
    setActiveModal('preview')
    setSelectedCard(card)
  }

  const handleAddClick = () => {
    setActiveModal('add-garment')
    setIsMobileMenuOpened(false)
  }

  const handleSignUpClick = () => {
    setActiveModal('register')
    setIsMobileMenuOpened(false)
  }

  const handleLoginClick = () => {
    setActiveModal('login')
    setIsMobileMenuOpened(false)
  }

  const handleEditProfileClick = () => {
    setActiveModal('edit')
    setIsMobileMenuOpened(false)
  }

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === 'F'
      ? setCurrentTemperatureUnit('C')
      : setCurrentTemperatureUnit('F')
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt')
    setIsLoggedIn(false)
    setCurrentUser(null)
    navigate('/')
  }

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem('jwt')
    const action = !isLiked ? addCardLike : removeCardLike

    action(id, token)
      .then((updateCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updateCard : item))
        )
      })
      .catch((err) => console.log(err))
  }

  const handleUpdateUser = (userData) => {
    setIsLoading(true)
    updateUser(userData)
      .then((updateUser) => {
        setCurrentUser(updateUser)
        closeActiveModal()
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }

  const handleRegister = (data) => {
    setIsLoading(true)
    return register(data)
      .then(() => handleLogin({ email: data.email, password: data.password }))
      .catch((err) => {
        console.error(err)
        return Promise.reject(err)
      })
      .finally(() => setIsLoading(false))
  }

  const handleLogin = ({ email, password }) => {
    setIsLoading(true)
    return authorize({ email, password })
      .then((res) => {
        localStorage.setItem('jwt', res.token)
        setIsLoggedIn(true)
        closeActiveModal()
      })
      .catch((err) => {
        console.error(err)
        return Promise.reject(err)
      })
      .finally(() => setIsLoading(false))
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
        <CurrentUserContext.Provider value={currentUser}>
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              handleSignUpClick={handleSignUpClick}
              handleLoginClick={handleLoginClick}
              currentDate={currentDate}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
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
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  isLoggedIn ? (
                    <Profile
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      onEditProfile={handleEditProfileClick}
                      onLogout={handleLogout}
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )
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
          <RegisterModal
            isOpen={activeModal === 'register'}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            isLoading={isLoading}
            handleLoginClick={handleLoginClick}
          />
          <LoginModal
            isOpen={activeModal === 'login'}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            isLoading={isLoading}
            handleSignUpClick={handleSignUpClick}
          />
          <EditProfileModal
            isOpen={activeModal === 'edit'}
            onClose={closeActiveModal}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  )
}

export default App
