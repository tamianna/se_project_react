import React, { useState, useEffect } from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import {
  validateName,
  validateImageUrl,
  validateWeather,
} from '../../scripts/validation'
import { useFormAndValidation } from '../hooks/useFormAndValidation'

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const { values, handleChange, errors, isValid, resetForm, setErrors } =
    useFormAndValidation()

  useEffect(() => {
    if (isOpen) {
      resetForm()
    }
  }, [isOpen, resetForm])

  const handleSubmit = (e) => {
    e.preventDefault()
    const nameErr = validateName(values.name || '')
    const urlErr = validateImageUrl(values.imageUrl || '')
    const weatherErr = validateWeather(values.weather || '')

    if (nameErr || urlErr || weatherErr) {
      setErrors({ name: nameErr, imageUrl: urlErr, weather: weatherErr })
      return
    }

    onAddItem({
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weather,
    })
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      closeActiveModal={onCloseModal}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid}
      noValidate
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          minLength={2}
          maxLength={40}
          required
          className="modal__input"
          value={values.name || ''}
          onChange={handleChange}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="image" className="modal__label">
        Image
        <input
          id="image"
          name="imageUrl"
          type="url"
          required
          className="modal__input"
          placeholder="Image URL"
          value={values.imageUrl || ''}
          onChange={handleChange}
        />
        {errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        {['hot', 'warm', 'cold'].map((temp) => (
          <label
            key={temp}
            htmlFor={temp}
            className="modal__label modal__radio-label"
          >
            <input
              id={temp}
              name="weather"
              type="radio"
              value={temp}
              className="modal__radio-input"
              checked={values.weather === temp}
              onChange={handleChange}
              required
            />
            <span>{temp[0].toUpperCase() + temp.slice(1)}</span>
          </label>
        ))}
        {errors.weather && (
          <span className="modal__error">{errors.weather}</span>
        )}
      </fieldset>
    </ModalWithForm>
  )
}

export default AddItemModal
