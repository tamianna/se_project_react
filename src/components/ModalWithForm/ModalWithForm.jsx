import './ModalWithForm.css'
import { Modal } from '../Modal/Modal'

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  closeActiveModal,
  onSubmit,
  isSubmitDisabled = false,
  formType= 'default', 
}) {
  return (
    <Modal name="form" isOpen={isOpen} onClose={closeActiveModal}>
      <h2 className="modal__title">{title}</h2>
      <form className="modal__form" onSubmit={onSubmit} noValidate>
        {children}
        <button
          type="submit"
          className={`modal__add-button ${
            isSubmitDisabled ? 'modal__add-button_inactive' : ''
          } modal__add-button_type_${formType}`}
          disabled={isSubmitDisabled}
        >
          {buttonText}
        </button>
      </form>
    </Modal>
  )
}

export default ModalWithForm
