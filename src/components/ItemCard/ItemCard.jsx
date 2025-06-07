import './ItemCard.css'
import defaultImage from '../../images/defaultimage.jpg'

export function shuffleItems(items = []) {
  const shuffled = [...items]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function ItemCard({ item, onCardClick }) {
  const handlePreviewModal = () => {
    onCardClick(item)
  }

  return (
    <li className="card">
      <h2 className="card__title">{item.name}</h2>
      <img
        onClick={handlePreviewModal}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onError={(e) => {
          e.target.src = { defaultImage }
        }}
      />
    </li>
  )
}

export default ItemCard
