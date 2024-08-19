import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ setMenuOpen, menuOpen }) => {
  let menuClass = "menu";
  if (menuOpen) {
    menuClass += " open";
  }

  return (
    <nav>
      <Link to="/" className="title">
        Илим булагы
      </Link>

      <div
        className={menuClass}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Toggle menu"}
        aria-expanded={menuOpen}
        role="button"
        tabIndex={0}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

     

      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink onClick={() => setMenuOpen(false)} to="/" end>
            Үй
          </NavLink>
        </li>
        <li>
          <NavLink onClick={() => setMenuOpen(false)} to="test">Сынак</NavLink>
        </li>
        <li>
          <NavLink onClick={() => setMenuOpen(false)} to="/zikr">Зикр</NavLink>
        </li>
        <li>
          <NavLink onClick={() => setMenuOpen(false)} to="/contact">Байланыш</NavLink>
        </li>
        <li>
          <NavLink onClick={() => setMenuOpen(false)} to="/register">Катталуу</NavLink>
        </li>
        <li>
          <NavLink onClick={() => setMenuOpen(false)} to="/nakyl">Катталуу</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
