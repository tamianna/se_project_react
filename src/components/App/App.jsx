import { useState } from "react";

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function App() {
    const [weatherData, setWeatherData] = useState({ type: "cold"});
    const [activeModal, setActiveModal] = useState("");

    const handleAddClick = () => {
        setActiveModal("add-garment");
    };

    return ( 
    <div className='page'>
        <div className='page__content'>
            <Header handleAddClick={handleAddClick} />
            <Main weatherData={weatherData} />
            <Footer />
        </div>
        <ModalWithForm 
        title="New garment" 
        buttonText="Add garment"
        activeModal={activeModal}
        >
            <label htmlFor="name" className="modal__label">
                    Name 
                    <input 
                    id="name"
                    type="text" 
                    placeholder="Name"
                    className="modal__input" />
                </label>
                <label htmlFor="image" className="modal__label">
                    Image
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
                    </legend>
                </fieldset>
        </ModalWithForm>
    </div>
    )
}

export default App;
