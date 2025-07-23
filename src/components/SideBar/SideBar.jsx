import './SideBar.css'
import React, { useContext } from 'react'
import headerAvatar from '../../images/header-avatar.svg'
import CurrentUserContext from '../../contexts/CurrentUserContext'

function SideBar({ onEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext)

  const avatar = currentUser?.avatar
  const name = currentUser?.name || 'Anonymous'

  const renderAvatar = () =>
    avatar ? (
      <img className="sidebar__avatar" src={avatar} alt="User avatar." />
    ) : (
      <div className="sidebar__avatar sidebar__avatar_placeholder">
        {name[0].toUpperCase()}
      </div>
    )

  return (
    <div className="sidebar">
      {renderAvatar()}
      <p className="sidebar__username">{name}</p>

      <div className="sidebar__mobile_text">
        <button className="sidebar__change-profile-btn" onClick={onEditProfile}>
          Change profile data
        </button>
        <button className="sidebar__logout-btn" onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  )
}

export default SideBar
