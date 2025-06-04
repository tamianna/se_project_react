import './SideBar.css'
import React from 'react'
import headerAvatar from '../../images/header-avatar.svg'

function SideBar() {
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={headerAvatar}
        alt="The default avatar."
      />
      <p className="sidebar__username">Terrence Tegegne</p>

      <div className="sidebar__mobile_text">
        <p className="sidebar__change-profile">Change profile data</p>
        <p className="sidebar__log-out">Log out</p>
      </div>
    </div>
  )
}

export default SideBar
