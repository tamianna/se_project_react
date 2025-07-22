import React, { useEffect } from 'react'
import ModalWithFrom from '../ModalWithForm/ModalWithForm'
import { useFormAndValidation } from '../../hooks/useFormAndValidation'

function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  isLoading,
  handleLoginClick,
}) {
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
      formType="signup"
      isOpen={isOpen}
      closeActiveModal={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid}
      noValidate
    >
      <label className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          className="modal__input"
          required
          placeholder="Email"
          value={values.email || ''}
          onChange={handleChange}
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label className="modal__label">
        Password*
        <input
          type="password"
          name="password"
          className="modal__input"
          required
          minLength={8}
          maxLength={16}
          placeholder="Password"
          value={values.password || ''}
          onChange={handleChange}
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
      <label className="modal__label">
        Name*
        <input
          type="text"
          name="name"
          className="modal__input"
          required
          minLength={2}
          maxLength={40}
          placeholder="Name"
          value={values.name || ''}
          onChange={handleChange}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label className="modal__label">
        Avatar URL*
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          required
          placeholder="Avatar URL"
          value={values.imageUrl || ''}
          onChange={handleChange}
        />
        {errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
      </label>
      <button
        onClick={handleLoginClick}
        type="button"
        className="modal__register-btn"
      >
        or Log In
      </button>
    </ModalWithFrom>
  )
}

export default RegisterModal
