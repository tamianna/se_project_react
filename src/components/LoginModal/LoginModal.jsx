import React, { useEffect } from 'react'
import ModalWithFrom from '../ModalWithForm/ModalWithForm'
import { useFormAndValidation } from '../../hooks/useFormAndValidation'

function LoginModal({ isOpen, onClose, onLogin, isLoading }) {
  const { values, handleChange, isValid, resetForm } = useFormAndValidation()

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
      title="Sign In"
      buttonText={isLoading ? 'Signing in...' : 'Sign in'}
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
    </ModalWithFrom>
  )
}

export default LoginModal
