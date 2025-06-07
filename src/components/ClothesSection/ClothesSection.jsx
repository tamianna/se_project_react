import './ClothesSection.css'
import React from 'react'
import ItemCard from '../ItemCard/ItemCard'

function ClothesSection({ handleCardClick, clothingItems }) {
  if (!clothingItems || clothingItems.length === 0) {
    return (
      <div className="clothes-section">
        <div className="clothes-section_menu">
          <p className="clothes-section_title">Your items</p>
          <button type="button" className="clothes-section_button">
            + Add new
          </button>
        </div>
        <p className="clothes-section__empty">No clothing items found.</p>
      </div>
    )
  }

  return (
    <div className="clothes-section">
      <div className="clothes-section_menu">
        <p className="clothes-section_title">Your items</p>
        <button type="button" className="clothes-section_button">
          + Add new
        </button>
      </div>
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
    </div>
  )
}

export default ClothesSection
