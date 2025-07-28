import './ItemCard.css'
import defaultImage from '../../images/defaultimage.jpg'
import dislikeHeart from '../../images/State=Default.svg'
import likeHeart from '../../images/State=Liked.svg'
import CurrentUserContext from '../../contexts/CurrentUserContext'

import { useContext } from 'react'

export function shuffleItems(items = []) {
  const shuffled = [...items]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext)
  const isLiked = item.likes.some((id) => id === currentUser?._id)

  const handlePreviewModal = () => {
    onCardClick(item)
  }
  const handleLike = () => onCardLike({ id: item._id, isLiked })

  return (
    <li className="card">
      <h2 className="card__title">{item.name}</h2>
      <img
        onClick={handlePreviewModal}
        className="card__image"
        src={typeof item.imageUrl === 'string' ? item.imageUrl : defaultImage}
        alt={item.name}
        onError={(e) => {
          e.target.src = defaultImage
        }}
      />
      {currentUser && (
        <button className="card__like-btn" type="button" onClick={handleLike}>
          <img
            src={isLiked ? likeHeart : dislikeHeart}
            alt={isLiked ? 'Unlike item' : 'Like item'}
            className="card__like-icon"
          />
        </button>
      )}
    </li>
  )
}

export default ItemCard
