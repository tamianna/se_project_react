import "./Header.css";
import headerLogo from "../../images/header-logo.svg";
import headerAvatar from "../../images/header-avatar.svg";
import menuOpenIcon from "../../images/menu-tab.svg";
import menuCloseIcon from "../../images/menu-close.svg";
import { useState } from "react";

function Header({ handleAddClick, currentDate, weatherData }) {
    const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpened(!isMobileMenuOpened);
    };

    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="WWTR logo."/>
            <p className="header__date-and-location">{currentDate}. {weatherData.city}.</p>

            {/*mobile menu toggle button */}
            <button 
            className="header__mobile-toggle"
            onClick={toggleMobileMenu}
            >
                <img 
                src={isMobileMenuOpened ? menuCloseIcon : menuOpenIcon} 
                alt={isMobileMenuOpened ? "Close menu" : "Open menu"} 
                />    
            </button>

            <div className={`header__nav-container ${isMobileMenuOpened ? "header__nav-container--open" : ""}`}>
                <button 
                    onClick={handleAddClick} 
                    type="button" 
                    className="header__add-clothes-btn">
                    + Add Clothes
                </button>
                <div className="header__user-container">
                    <p className="header__username">Terrence Tegegne</p>
                    <img src={headerAvatar} alt="Terrence Tegegne." className="header__avatar" />
                </div>
            </div>
        </header>
    )
}

export default Header;