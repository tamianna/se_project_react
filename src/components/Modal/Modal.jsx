import React, { useEffect } from 'react'
import closeButton from '../../images/closebutton.svg'

export const Modal = ({ name, isOpen, onClose, children, containerClass }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className={`modal modal_type_${name} modal_opened`}
      onClick={handleOverlay}
    >
      <div className={`modal__container ${containerClass}`}>
        {children}
        <button className="modal__close-button" type="button" onClick={onClose}>
          <img
            src={closeButton}
            alt="Close button, an X."
            className="modal__close-icon"
          />
        </button>
      </div>
    </div>
  )
}
