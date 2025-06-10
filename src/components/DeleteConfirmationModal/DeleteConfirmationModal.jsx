import './DeleteConfirmationModal.css'
import closeButton from '../../images/confirmationclose.svg'

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, isLoading }) {
  const deleteText = isLoading ? 'Deleting...' : 'Yes, delete item'
  const cancelText = isLoading ? 'Canceling...' : 'Cancel'

  return (
    <div className={`modal ${isOpen ? 'modal_opened' : ''}`}>
      <div className="modal__container modal__confirmation">
        <div className="modal__confirmation_text">
          <p className="modal__confirmation-title">
            Are you sure you want to delete this item?
          </p>
          <p className="modal__confirmation-subtitle">
            This action is irreversible.
          </p>
        </div>
        <button
          type="button"
          className="modal__confirmation_close-button"
          onClick={onClose}
          disabled={isLoading}
        >
          <img src={closeButton} alt="X, for close button." />
        </button>
        <form className="modal__delete-form">
          <div className="modal__confirmation-buttons">
            <button
              type="submit"
              className="modal__confirmation_delete-button"
              onClick={onConfirm}
              disabled={isLoading}
            >
              <span className="fade-text">{deleteText}</span>
            </button>
            <button
              type="button"
              className="modal__confirmation_cancel-button"
              onClick={onClose}
              disabled={isLoading}
            >
              <span className="fade-text">{cancelText}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DeleteConfirmationModal
