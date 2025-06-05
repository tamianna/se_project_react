import './ItemCard.css'
import defaultImage from '../../images/defaultimage.jpg'

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
