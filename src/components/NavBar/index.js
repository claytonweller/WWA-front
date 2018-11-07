import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./NavBar.css";
import { toggleNavMenu, closeNavMenu } from "../../actions/nav";
import { openModalPage, closeModal } from "../../actions/profile";
import { logout } from "../../actions/auth";
import { parseJwt } from "../../parseJwt";
import { reset } from "redux-form";

import Tear from "../sharedComponents/Tear";

let logo = require("../../assets/images/logo.png");
let menuBars = require("../../assets/images/menu-bars.png");
let searchGlass = require("../../assets/images/Black-Search.png");

export function NavBar(props) {
  let linkList = (
    <ul>
      <li>
        <a href="none" onClick={e => menuLinkClick(e, "basic")}>
          Basic Info
        </a>
      </li>
      <li>
        <a href="none" onClick={e => menuLinkClick(e, "disciplines")}>
          Disciplines
        </a>
      </li>
      <li>
        <a href="none" onClick={e => menuLinkClick(e, "display")}>
          Display
        </a>
      </li>
      <li>
        <a href="none" onClick={e => menuLinkClick(e, "bio")}>
          Bio & Equipment
        </a>
      </li>
      <li>
        <a href="none" onClick={e => logOutClick(e)}>
          Log Out
        </a>
      </li>
    </ul>
  );

  const menuLinkClick = (e, desination) => {
    e.preventDefault();
    props.dispatch(openModalPage(desination));
    props.dispatch(closeNavMenu());
  };

  const resetAllForms = () => {
    props.dispatch(reset("login"));
    props.dispatch(reset("basic"));
    props.dispatch(reset("discipline"));
    props.dispatch(reset("display"));
    props.dispatch(reset("bio"));
  };

  const logOutClick = e => {
    e.preventDefault();
    props.dispatch(logout());
    props.history.push("/");
    props.dispatch(closeNavMenu());
    props.dispatch(closeModal());
    resetAllForms();
  };

  const toggleMenuAction = e => {
    e.preventDefault();
    props.dispatch(toggleNavMenu());
  };

  const loginClick = e => {
    e.preventDefault();
    props.dispatch(openModalPage("login"));
  };

  let mobileNav = (
    <div>
      <a href="NONE" onClick={e => toggleMenuAction(e)}>
        <img className="menu-bars" src={menuBars} alt="Menu" />
      </a>
    </div>
  );

  let wideNav = (
    <div>
      <a href="NONE" onClick={e => loginClick(e)}>
        Log In
      </a>
      <button
        onClick={() => {
          props.dispatch(openModalPage("basic"));
          props.dispatch(closeNavMenu());
        }}
      >
        Sign Up
      </button>
    </div>
  );

  let dropDown = (
    <div
      style={{ textAlign: "center" }}
      className="drop-down"
      hidden={!props.menuIsOpen}
    >
      <a href="NONE" onClick={e => loginClick(e)}>
        Log In
      </a>
      <button
        onClick={() => {
          props.dispatch(openModalPage("basic"));
          props.dispatch(closeNavMenu());
        }}
      >
        Sign Up
      </button>
    </div>
  );

  let searchTab;
  if (props.loggedIn) {
    let img;
    if (localStorage.getItem("authToken")) {
      img = parseJwt(localStorage.getItem("authToken")).user.img_url;
    }
    mobileNav = wideNav = (
      <Tear
        clickAction={toggleMenuAction}
        height="50px"
        width="50px"
        name="Clayton"
        imageUrl={img}
      />
    );
    dropDown = (
      <div className="drop-down" hidden={!props.menuIsOpen}>
        {linkList}
      </div>
    );
    searchTab = (
      <div className="mobile-screen search-tab">
        <a
          href="NONE"
          onClick={e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            props.dispatch(closeModal());
          }}
        >
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
      {dropDown}
      {searchTab}
    </div>
  );
}

NavBar.defaultProps = {
  menuIsOpen: false,
  loggedIn: false
};

const mapStateToProps = state => ({
  menuIsOpen: state.nav.menuIsOpen,
  loggedIn: !!state.auth.currentUser
});

export default connect(mapStateToProps)(withRouter(NavBar));
