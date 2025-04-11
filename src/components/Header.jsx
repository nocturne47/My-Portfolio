import React from "react";
import "./Header.css";
import { useState } from "react";

function Header() {
  // const [active, setActive] = useState(false);
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#About">About me</a>
          </li>
          <li>
            <a href="#Projects">Projects</a>
          </li>
          {/* <li><a href="#FaceRecog">Are you enough?</a></li> */}
          <li>
            <a href="#Contact">Contact me</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
