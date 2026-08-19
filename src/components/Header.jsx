import { useState } from "react";
import logo from "../assets/Samarkand breads.jpg";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const closeMenu = () => setMenuOpen(false);

    return (
        <header>
            <div className="container header-container">
                <div className="logo-area">
                    <img src={logo} alt="Samarkand Breads Logo" className="site-logo" />
                    <span className="logo-text">
                        Samarkand<span>Breads</span>
                    </span>
                </div>

                <button
                    className={`menu-toggle ${menuOpen ? "active" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Menyu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav id="mainNav" className={menuOpen ? "active" : ""}>
                    <ul className="nav-links">
                        <li><a href="#home" onClick={closeMenu}>Asosiy</a></li>
                        <li><a href="#about" onClick={closeMenu}>Biz haqimizda</a></li>
                        <li><a href="#menu" onClick={closeMenu}>Katalog</a></li>
                        <li><a href="#contact" onClick={closeMenu}>Buyurtma berish</a></li>
                    </ul>
                </nav>

                <a href="#contact" className="btn btn-nav">Hoziroq buyurtma berish</a>
            </div>
        </header>
    );
}

export default Header;