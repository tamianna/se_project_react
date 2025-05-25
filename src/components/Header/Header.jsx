import "./Header.css";
import headerLogo from "../../images/header-logo.svg";
import headerAvatar from "../../images/header-avatar.svg";
import menuOpenIcon from "../../images/menu-tab.svg";
import menuCloseIcon from "../../images/menu-close.svg";

function Header({ handleAddClick, currentDate, weatherData }) {
    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="WWTR logo."/>
            <p className="header__date-and-location">{currentDate}. {weatherData.city}.</p>
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
        </header>
    )
}

export default Header;