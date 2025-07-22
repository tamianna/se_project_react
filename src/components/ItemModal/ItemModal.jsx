import './ItemModal.css'
import previewCloseButton from '../../images/previewclosebutton.svg'
import defaultImage from '../../images/defaultimage.jpg'

import { Modal } from '../Modal/Modal'
import { useContext } from 'react'

import CurrentUserContext from '../../contexts/CurrentUserContext'

function ItemModal({ activeModal, closeActiveModal, card, onConfirmDelete }) {
  const currentUser = useContext(CurrentUserContext)
  const isOwn = card.owner === currentUser?._id

  return (
    <Modal
      name="preview"
      isOpen={activeModal === 'preview'}
      onClose={closeActiveModal}
      containerClass="modal__container_type_preview"
    >
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
        {isOwn && (
          <button
            type="button"
            className="modal__delete-button"
            onClick={() => onConfirmDelete(card)}
          >
            Delete item
          </button>
        )}
      </div>
    </Modal>
  )
}

export default ItemModal
