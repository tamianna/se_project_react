import './ItemModal.css'
import previewCloseButton from '../../images/previewclosebutton.svg'
import defaultImage from '../../images/defaultimage.jpg'

function ItemModal({ activeModal, closeActiveModal, card }) {
  return (
    <div className={`modal ${activeModal === 'preview' && 'modal_opened'}`}>
      <div className="modal__container modal__container_type_preview">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close-button"
        >
          <img
            src={previewCloseButton}
            alt="Close button, an X."
            className="modal__close-icon"
          />
        </button>
        <img
          src={card.imageUrl}
          alt={card.name}
          className="modal__image"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = { defaultImage }
          }}
        />
        <div className="modal__footer">
          <p className="modal__caption">{card.name}</p>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  )
}

export default ItemModal
