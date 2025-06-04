import './ClothesSection.css'
import React from 'react'
import { defaultClothingItems } from '../../utils/constants'

import ItemCard from '../ItemCard/ItemCard'

function ClothesSection({ handleCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section-menu">
        <p className="clothes-section_title">Your items</p>
        <button type="button" className="clothes-section_button">
          + Add new
        </button>
      </div>
      <ul className="cards__lists">
        {defaultClothingItems
          .map((item) => {
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
