import './Header.css'
import { Link } from 'react-router-dom'

import headerLogo from '../../images/header-logo.svg'
import headerAvatar from '../../images/header-avatar.svg'
import menuOpenIcon from '../../images/menu-tab.svg'
import menuCloseIcon from '../../images/menu-close.svg'
import ToggleSwitch from '../ToggleSwitch/ToggleSwith.jsx'

function Header({
  handleAddClick,
  currentDate,
  weatherData,
  isMobileMenuOpened,
  setIsMobileMenuOpened,
}) {
  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened)
  }

  return (
    <header className="header">
      <Link to="/se_project_react">
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
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>

        <Link to="/se_project_react/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">Terrence Tegegne</p>
            <img
              src={headerAvatar}
              alt="Terrence Tegegne."
              className="header__avatar"
            />
          </div>
        </Link>
      </div>
    </header>
  )
}

export default Header
