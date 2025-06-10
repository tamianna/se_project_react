import './DeleteConfirmationModal.css'
import closeButton from '../../images/confirmationclose.svg'

function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  isCanceling,
}) {
   const deleteButtonText = isDeleting ? 'Deleting...' : 'Yes, delete item';
  const cancelButtonText = isCanceling ? 'Canceling...' : 'Cancel';

  const isAnyLoading = isDeleting || isCanceling;

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
          disabled={isAnyLoading}
        >
          <img src={closeButton} alt="X, for close button." />
        </button>
        <form className="modal__delete-form">
          <div className="modal__confirmation-buttons">
            <button
              type="submit"
              className="modal__confirmation_delete-button"
              onClick={onConfirm}
              disabled={isAnyLoading}
            >
              {deleteButtonText}
            </button>
            <button
              type="button"
              className="modal__confirmation_cancel-button"
              onClick={onClose}
              disabled={isAnyLoading}
            >
              {cancelButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DeleteConfirmationModal
