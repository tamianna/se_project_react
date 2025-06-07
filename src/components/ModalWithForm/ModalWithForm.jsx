import './ModalWithForm.css'
import closeButton from '../../images/closebutton.svg'

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  closeActiveModal,
  onSubmit,
  isSubmitDisabled = false,
}) {
  return (
    <div className={`modal ${isOpen ? 'modal_opened' : ''}`}>
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close-button"
        >
          <img
            src={closeButton}
            alt="Close button, an X."
            className="modal__close-icon"
          />
        </button>

        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className={`modal__save-button ${
              isSubmitDisabled ? 'modal__save-button_inactive' : ''
            }`}
            disabled={isSubmitDisabled}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ModalWithForm
