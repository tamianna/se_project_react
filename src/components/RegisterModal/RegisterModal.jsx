import React, { useEffect } from 'react'
import ModalWithFrom from '../ModalWithForm/ModalWithForm'
import { useFormAndValidation } from '../../hooks/useFormAndValidation'

function RegisterModal({ isOpen, onClose, onRegister, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation()

  useEffect(() => {
    if (isOpen) {
      resetForm()
    }
  }, [isOpen, resetForm])

  const handleSubmit = (e) => {
    e.preventDefault()
    onRegister(values)
  }

  return (
    <ModalWithFrom
      title="Sign up"
      buttonText={isLoading ? 'Signing up...' : 'Sign up'}
      isOpen={isOpen}
      closeActiveModal={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid}
      noValidate
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          required
          value={values.eamil || ''}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          required
          value={values.password || ''}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          required
          value={values.name || ''}
          onChange={handleChange}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          className="modal__input"
          required
          value={values.avatar || ''}
          onChange={handleChange}
        />
      </label>
    </ModalWithFrom>
  )
}

export default RegisterModal
