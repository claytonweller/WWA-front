import React from "react";
import { connect } from "react-redux";
import "./NavBar.css";

import Tear from "../sharedComponents/Tear";

let logo = require("../../assets/images/logo.png");
let menuBars = require("../../assets/images/menu-bars.png");
let searchGlass = require("../../assets/images/Black-Search.png");

export function NavBar(props) {
  let loggedIn = true;
  let linkList = (
    <ul>
      <li>
        <a>Link</a>
      </li>
      <li>
        <a>Link</a>
      </li>
      <li>
        <a>This is a longer link</a>
      </li>
      <li>
        <a>Link</a>
      </li>
    </ul>
  );

  let mobileNav = (
    <div>
      <a href="NONE">
        <img className="menu-bars" src={menuBars} alt="Menu" />
      </a>
    </div>
  );

  let wideNav = (
    <div>
      <a href="NONE">Log In</a>
      <button>Sign Up</button>
    </div>
  );

  let dropDown = (
    <div className="drop-down" hidden>
      <a href="NONE">Log In</a>
      <button>Sign Up</button>
    </div>
  );

  let searchTab;
  if (loggedIn) {
    mobileNav = wideNav = (
      <div>
        <a href="NONE">
          <Tear height="50px" width="50px" name="Clayton" />
        </a>
      </div>
    );
    dropDown = (
      <div className="drop-down" hidden>
        {linkList}
      </div>
    );
    searchTab = (
      <div className="mobile-screen search-tab">
        <a href="NONE">
          <img src={searchGlass} alt="Search icon" />
        </a>
      </div>
    );
  }

  return (
    <div className="nav">
      <div className="nav-bar mobile-screen">
        <img className="nav-logo" src={logo} alt="Work With Artists" />
        {mobileNav}
      </div>
      <div className="nav-bar wide-screen">
        <img className="nav-logo" src={logo} alt="Work With Artists" />
        {wideNav}
      </div>
      <hr />
      {/* <div className="bar-gradient" /> */}
      {dropDown}
      {searchTab}
    </div>
  );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(NavBar);
