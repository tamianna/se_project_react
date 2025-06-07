import React, { useState, useEffect } from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import {
  validateName,
  validateImageUrl,
  validateWeather,
  isFormValid
} from '../../scripts/validation'

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const [name, setName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [weather, setWeather] = useState('')
  const [errors, setErrors] = useState({})

  const formIsVaild = isFormValid(name, imageUrl, weather)

  useEffect(() => {
    if (isOpen) {
      setName('')
      setImageUrl('')
      setWeather('')
      setErrors({})
    }
  }, [isOpen])

  const handleNameChange = (e) => {
    const value = e.target.value
    setName(value)
    setErrors((prev) => ({ ...prev, name: validateName(value) }))
  }

  const handleImageUrlChange = (e) => {
    const value = e.target.value
    setImageUrl(value)
    setErrors((pre) => ({ ...prev, imageUrl: validateImageUrl(value) }))
  }

  const handleWeatherChange = (e) => {
    const value = e.target.id
    setWeather(value)
    setErrors((prev) => ({ ...prev, weather: validateWeather(value) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nameErr = validateName(name)
    const urlErr = validateImageUrl(imageUrl)
    const weatherErr = validateWeather(weather)

    if (nameErr || urlErr || weatherErr) {
      setErrors({ name: nameErr, imageUrl: urlErr, weather: weatherErr })
      return
    }

    onAddItem({ name, imageUrl, weather })
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      closeActiveModal={onCloseModal}
      onSubmit={handleSubmit}
      isSubmitDisabled={!formIsVaild}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          id="name"
          type="text"
          placeholder="Name"
          minLength={2}
          maxLength={40}
          required
          className="modal__input"
          value={name}
          onChange={handleNameChange}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="image" className="modal__label">
        Image
        <input
          id="image"
          type="url"
          required
          className="modal__input"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleImageUrlChange}
        />
        {errors.name && <span className="modal__error">{errors.imageUrl}</span>}
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__radio-label">
          <input
            id="hot"
            name="weather"
            type="radio"
            className="modal__radio-input"
            checked={weather === 'hot'}
            onChange={handleWeatherChange}
          />
          <span>Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__radio-label">
          <input
            id="warm"
            name="weather"
            type="radio"
            className="modal__radio-input"
            checked={weather === 'warm'}
            onChange={handleWeatherChange}
          />
          <span>Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__radio-label">
          <input
            id="cold"
            name="weather"
            type="radio"
            className="modal__radio-input"
            checked={weather === 'cold'}
            onChange={handleWeatherChange}
          />
          <span>Cold</span>
        </label>
        {errors.weather && (
          <span className="modal__error">{errors.weather}</span>
        )}
      </fieldset>
    </ModalWithForm>
  )
}

export default AddItemModal
