import React from "react";
import { connect } from "react-redux";
import LandingTears from "./LandingTears";
import { openModalPage } from "../../actions/profile";

let logo = require("../../assets/images/full-logo.png");

export function AboveFold(props) {
  const logInClick = e => {
    e.preventDefault();
    props.dispatch(openModalPage("login"));
  };

  const signUpClick = e => {
    e.preventDefault();
    props.dispatch(openModalPage("signup"));
  };

  return (
    <div className="above-fold">
      <div className="logo-holder">
        <img className="full-logo" src={logo} alt="Work With Artists" />
        <LandingTears />
      </div>

      <hr />
      <div className="button-holder">
        <a href="none" onClick={e => logInClick(e)}>
          log in
        </a>
        <button onClick={e => signUpClick(e)}>Sign Up</button>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(AboveFold);
