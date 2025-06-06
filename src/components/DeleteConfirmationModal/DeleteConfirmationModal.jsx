import './DeleteConfirmationModal.css'

function DeleteConfirmationModal({ isOpen, onClose, onConfrim }) {
  return (
    <div className={`modal ${isOpen ? 'modal_opened' : ''}`}>
      <div className="modal__container modal__container_type_delete">
        <h2 className="modal__delete-title">
          Are you sure you want to delete this image?
        </h2>
        <button
          type="button"
          className="modal__close-button-preview modal__close-button-delete"
        ></button>
        <form id="delete-form" className="modal__delete-form">
          <button type="submit" className="modal__delete-button">
            Delete
          </button>
          <button type="button" className="modal__cancel-button">
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

export default DeleteConfirmationModal
