import React, { Component } from "react";

import logo from "../logo.svg";
import "./Sidebar.css";

class Sidebar extends Component {
  render() {
    return (
      <aside className="sidebar">
        <img src={ logo } alt="Dropbox Logo" />
        <ul className="menu">
          <li className="menu__item">
            Profile
          </li>
          <li className="menu__item">
            Setting
          </li>
          <li className="menu__item">
            Log out
          </li>
        </ul>
      </aside>
    );
  }
}

export default Sidebar;
