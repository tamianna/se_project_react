import './ClothesSection.css'
import ItemCard from '../ItemCard/ItemCard'
import CurrentUserContext from '../../contexts/CurrentUserContext'

import { useContext } from 'react'

function ClothesSection({
  handleCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext)

  const userItems = clothingItems
    ? clothingItems.filter(
        (item) =>
          item.owner === currentUser._id || item.owner?._id === currentUser._id
      )
    : []

  const noItems = userItems.length === 0

  return (
    <div className="clothes-section">
      <div className="clothes-section_menu">
        <p className="clothes-section_title">Your items</p>
        <button
          type="button"
          className="clothes-section_button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>
      {noItems ? (
        <p className="clothes-section__empty">No clothing items found.</p>
      ) : (
        <ul className="cards__lists">
          {userItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default ClothesSection
