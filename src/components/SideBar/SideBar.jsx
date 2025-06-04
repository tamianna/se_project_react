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
    </div>
  )
}

export default SideBar
