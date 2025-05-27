import './ItemCard.css'

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
        src={item.link}
        alt={item.name}
      />
    </li>
  )
}

export default ItemCard
