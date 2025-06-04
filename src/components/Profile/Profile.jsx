import SideBar from '../SideBar/SideBar'
import './Profile.css'
import React from 'react'

function Profile() {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes"></section>
    </div>
  )
}

export default Profile
