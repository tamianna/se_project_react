import './SideBar.css'
import React, { useContext } from 'react'
import headerAvatar from '../../images/header-avatar.svg'
import CurrentUserContext from '../../contexts/CurrentUserContext'

function SideBar({ onEditProfle }) {
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
