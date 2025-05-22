import "./Header.css";
import headerLogo from "../../images/header-logo.svg";
import headerAvatar from "../../images/header-avatar.svg";

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="WWTR logo."/>
            <p className="header__date-and-location">DATE. LOCATION.</p>
            <button className="header__add-clothes-btn">+ Add Clothes</button>
            <div className="header__user-container">
                <p className="header__username">Terrence Tegegne</p>
                    <img src={headerAvatar} alt="Terrence Tegegne." className="header__avatar" />
            </div>
        </header>
    )
}

export default Header;