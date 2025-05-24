import "./ModalWithForm.css";
import closeButton from "../../images/closebutton.svg";

function ModalWithForm({ children, buttonText, title, activeModal, closeActiveModal }) {
    return (
        <div className={`modal ${activeModal === "add-garment" && "modal__opened"}`}>
            <div className="modal__container">
                <h2 className="modal__title">{title}</h2>
                <button 
                    onClick={closeActiveModal} 
                    type="button" 
                    className="modal__close-button"
                >
                    <img src={closeButton} alt="Close button, an X." className="modal__close-icon" />
                </button>

            <form className="modal__form">
                {children}
            </form>
            <button type="submit" className="modal__add-button">
                {buttonText}
            </button>
        </div>
    </div>
    )
}

export default ModalWithForm;