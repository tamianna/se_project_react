import './DeleteConfirmationModal.css'
import { Modal } from '../Modal/Modal'

function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  isCanceling,
}) {
  const deleteButtonText = isDeleting ? 'Deleting...' : 'Yes, delete item'
  const cancelButtonText = isCanceling ? 'Canceling...' : 'Cancel'

  const isAnyLoading = isDeleting || isCanceling

  return (
    <Modal
      name="confirmation"
      onClose={onClose}
      isOpen={isOpen}
      disabledClose={isAnyLoading}
    >
      <div className="modal__confirmation_text">
        <p className="modal__confirmation-title">
          Are you sure you want to delete this item?
        </p>
        <p className="modal__confirmation-subtitle">
          This action is irreversible.
        </p>
      </div>
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
    </Modal>
  )
}

export default DeleteConfirmationModal
