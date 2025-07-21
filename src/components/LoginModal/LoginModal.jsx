import React, { useEffect } from 'react'
import ModalWithFrom from '../ModalWithForm/ModalWithForm'
import { useFormAndValidation } from '../../hooks/useFormAndValidation'

function LoginModal({ isOpen, onClose, onLogin, isLoading }) {
  const { values, handleChange, isValid, errors, resetForm } =
    useFormAndValidation()

  useEffect(() => {
    if (isOpen) {
      resetForm()
    }
  }, [isOpen, resetForm])

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(values)
  }

  return (
    <ModalWithFrom
      title="Log In"
      buttonText={isLoading ? 'Logging In...' : 'Log In'}
      formType="login"
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
          placeholder="Email"
          value={values.email || ''}
          onChange={handleChange}
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          required
          placeholder="Password"
          minLength={8}
          maxLength={16}
          value={values.password || ''}
          onChange={handleChange}
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
      <div className="modal__text-login">or Sign Up</div>
    </ModalWithFrom>
  )
}

export default LoginModal
