import './Header.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'

import headerLogo from '../../images/header-logo.svg'
import headerAvatar from '../../images/header-avatar.svg'
import menuOpenIcon from '../../images/menu-tab.svg'
import menuCloseIcon from '../../images/menu-close.svg'
import ToggleSwitch from '../ToggleSwitch/ToggleSwith.jsx'
import CurrentUserContext from '../../contexts/CurrentUserContext.jsx'

function Header({
  handleAddClick,
  currentDate,
  weatherData,
  isMobileMenuOpened,
  setIsMobileMenuOpened,
  isLoggedIn,
  handleSignUpClick,
  handleLoginClick,
}) {
  const currentUser = useContext(CurrentUserContext)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened)
  }

  const renderAvatar = () => {
    if (currentUser?.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt={`${currentUser.name}`}
          className="header__avatar"
        />
      )
    }
    const initial = currentUser?.name?.[0]?.toUpperCase() || '?'
    return (
      <div className="header__avatar header__avatar_placeholder">{initial}</div>
    )
  }

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={headerLogo} alt="WWTR logo." />
      </Link>
      <p className="header__date-and-location">
        {currentDate}.{weatherData.city}.
      </p>

      {/*mobile menu toggle button */}
      <button className="header__mobile-toggle" onClick={toggleMobileMenu}>
        <img
          src={isMobileMenuOpened ? menuCloseIcon : menuOpenIcon}
          alt={isMobileMenuOpened ? 'Close menu' : 'Open menu'}
          className={`header__mobile-icon ${isMobileMenuOpened ? 'header__mobile-icon--open' : ''}`}
        />
      </button>

      <div
        className={`header__nav-container ${isMobileMenuOpened ? 'header__nav-container--open' : ''}`}
      >
        <ToggleSwitch />

        {!isLoggedIn ? (
          <div className="header__auth-btn">
            <button
              onClick={handleSignUpClick}
              type="button"
              className="header__auth-btn"
            >
              Sign Up
            </button>
            <button
              onClick={handleLoginClick}
              type="button"
              className="header__auth-btn"
            >
              Log In
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add Clothes
            </button>

            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__username">Terrence Tegegne</p>
                <img
                  src={headerAvatar}
                  alt="Terrence Tegegne."
                  className="header__avatar"
                />
              </div>
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
