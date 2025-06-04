import './Profile.css'
import React from 'react'
import headerAvatar from '../../images/header-avatar.svg'

function Profile() {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <img src={headerAvatar} alt="The avatar photo." />
      </section>
      <section className="profile__clothes"></section>
    </div>
  )
}

export default Profile
