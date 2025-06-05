import React, { useState, useEffect } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [weather, setWeather] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName('');
      setImageUrl('');
      setWeather('');
    }
  }, [isOpen]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleImageUrlChange = (e) => setImageUrl(e.target.value);
  const handleWeatherChange = (e) => setWeather(e.target.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      closeActiveModal={onCloseModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          id="name"
          type="text"
          placeholder="Name"
          className="modal__input"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="image" className="modal__label">
        Image
        <input
          id="image"
          type="url"
          className="modal__input"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleImageUrlChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">
          Select the weather type:
        </legend>
        <label htmlFor="hot" className="modal__label modal__radio-label">
          <input
            id="hot"
            name="weather"
            type="radio"
            className="modal__radio-input"
            checked={weather === 'hot'}
            onChange={handleWeatherChange}
          />
          <span>Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__radio-label">
          <input
            id="warm"
            name="weather"
            type="radio"
            className="modal__radio-input"
            checked={weather === 'warm'}
            onChange={handleWeatherChange}
          />
          <span>Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__radio-label">
          <input
            id="cold"
            name="weather"
            type="radio"
            className="modal__radio-input"
            checked={weather === 'cold'}
            onChange={handleWeatherChange}
          />
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;