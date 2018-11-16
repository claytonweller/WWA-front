import React from "react";
import { connect } from "react-redux";
import "./AboveFold.css";

let tears = require("../../assets/images/landing-tears.png");

export function LandingTears(props) {
  // TODO add in the auto populated face tears

  return (
    <div className="landing-tears">
      <img src={tears} alt="drops" />
    </div>
  );
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(LandingTears);
