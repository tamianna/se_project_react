import "./ModalWithForm.css";

function ModalWithForm() {
    return (
        <div className="modal">
            <div className="modal__container">
                <h2 className="modal__title">New garment</h2>
                <button type="button" className="modal__close"></button>
            </div>
            <form className="modal__form">
                <label htmlFor="name" className="modal__label">
                    Name 
                    <input 
                    id="name"
                    type="text" 
                    placeholder="Name"
                    className="modal__input" />
                </label>
                <label htmlFor="iomage" className="modal__label">
                    <input 
                    id="image"
                    type="url" 
                    className="modal__input"
                    placeholder="Image URL"
                    />
                </label>
                <fieldset className="modal__radio-buttons">
                    <legend className="modal__legend">
                        Select the weather type:
                        <label htmlFor="hot" 
                        className="modal__label modal__label_type_radio">
                            <input 
                            id="hot"
                            type="radio" 
                            className="modal__radio-input" />
                            Hot
                        </label>
                         <label htmlFor="warm" 
                        className="modal__label modal__label_type_radio">
                            <input 
                            id="warm"
                            type="radio" 
                            className="modal__radio-input" />
                            Warm
                        </label>
                         <label htmlFor="cold" 
                        className="modal__label modal__label_type_radio">
                            <input 
                            id="cold"
                            type="radio" 
                            className="modal__radio-input" />
                            Cold
                        </label>
                        <button type="submit" className="modal__add-button">
                            Add garment
                        </button>
                    </legend>
                </fieldset>
            </form>
        </div>
    )
}

export default ModalWithForm;