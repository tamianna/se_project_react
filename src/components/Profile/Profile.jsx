import ClothesSection from '../ClothesSection/ClothesSection'
import SideBar from '../SideBar/SideBar'
import './Profile.css'
import React from 'react'

function Profile() {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes">
        <ClothesSection />
      </section>
    </div>
  )
}

export default Profile
