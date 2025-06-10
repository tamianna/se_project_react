import './ClothesSection.css'
import ItemCard from '../ItemCard/ItemCard'

function ClothesSection({ handleCardClick, clothingItems, handleAddClick }) {
  const noItems = !clothingItems || clothingItems.length === 0

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
          {clothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default ClothesSection
