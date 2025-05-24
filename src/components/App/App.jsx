import { useState, useEffect } from "react";

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

function App() {
    const [weatherData, setWeatherData] = useState({ type: "cold"});
    const [activeModal, setActiveModal] = useState("");
    const [selectedCard, setSelectedCard] = useState({});
    const [currentDate, setCurrentDate]= useState("");

    useEffect(() => {
        const today = new Date().toLocaleString("defualt", {
            month: "long",
            day: "numeric",
        });
        setCurrentDate(today);
    }, []);

    const handleCardClick = (card) => {
        setActiveModal("preview");
        setSelectedCard(card);
    };

    const handleAddClick = () => {
        setActiveModal("add-garment");
    };

    const closeActiveModal = () => {
        setActiveModal("");
    };

    return ( 
    <div className='page'>
        <div className='page__content'>
            <Header 
            handleAddClick={handleAddClick}
            currentDate={currentDate}
             />
            <Main 
            weatherData={weatherData}
            handleCardClick={handleCardClick} 
            />
            <Footer />
        </div>
        <ModalWithForm 
        title="New garment" 
        buttonText="Add garment"
        activeModal={activeModal}
        closeActiveModal={closeActiveModal}
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
                        className="modal__label modal__radio-label">
                            <input 
                            id="hot"
                            type="radio" 
                            className="modal__radio-input" />
                            <span>Hot</span>
                        </label>
                         <label htmlFor="warm" 
                        className="modal__label modal__radio-label">
                            <input 
                            id="warm"
                            type="radio" 
                            className="modal__radio-input" />
                            <span>Warm</span>
                        </label>
                         <label htmlFor="cold" 
                        className="modal__label modal__radio-label">
                            <input 
                            id="cold"
                            type="radio" 
                            className="modal__radio-input" />
                            <span>Cold</span>
                        </label>
                    </legend>
                </fieldset>
        </ModalWithForm>
        <ItemModal 
        activeModal={activeModal} 
        card={selectedCard}
        closeActiveModal={closeActiveModal} 
        />
    </div>
    )
}

export default App;
