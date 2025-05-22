import "./Header.css";

function Header() {
    return (
        <header className="header">
            <img className="header__logo"/>
            <p className="header__date-and-location">DATE. LOCATION.</p>
            <button className="header__add-clothes-btn">+ ADD CLOTHES</button>
            <div className="header__user-container">
                <p className="header__username">NAME 
                    <img src="" alt="" className="header__avatar" /></p>
            </div>
        </header>
    )
}

export default Header;