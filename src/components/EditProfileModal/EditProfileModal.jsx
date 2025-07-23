import React, { useEffect, useContext, useState } from 'react'
import ModalWithFrom from '../ModalWithForm/ModalWithForm'
import CurrentUserContext from '../../contexts/CurrentUserContext'

function EditProfileModal({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext)

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    if (currentUser && isOpen) {
      setName(currentUser.name || '')
      setAvatar(currentUser.avatar || '')
    }
  }, [currentUser, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdateUser({ name, avatar })
  }

  return (
    <ModalWithFrom
      title="Change profile data"
      buttonText={isLoading ? 'Saving changes...' : 'Save changes'}
      formType="edit"
      isOpen={isOpen}
      closeActiveModal={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid}
      noValidate
    >
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
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        {errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
      </label>
    </ModalWithFrom>
  )
}

export default EditProfileModal
