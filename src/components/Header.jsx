import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="header">
      <div className="logo-header" href="#Home">
        <img src="/favicon.png" alt="" />
      </div>
      <nav className={`nav-links ${isOpen ? "open" : ""}`}>
        <a href="#Home" onClick={closeMenu}>
          Home
        </a>
        <a href="#About" onClick={closeMenu}>
          About me
        </a>
        <a href="#Projects" onClick={closeMenu}>
          Projects
        </a>
        <a href="#Contact" onClick={closeMenu}>
          Contact me
        </a>
      </nav>

      <div className="hamburger" onClick={toggleMenu}>
        {isOpen ? "×" : "☰"}
      </div>
    </header>
  );
};

export default Header;
