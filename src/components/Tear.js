import React from "react";
import { connect } from "react-redux";
import "./Tear.css";

// This is place holder image
let url = require("../assets/TestImage.png");

export function Tear(props) {
  let colors = ["#F7EF6A", "#93C178", "#465C8B"];
  let color = colors[props.colorString.length % 3];

  return (
    <div className="tear">
      <div style={{ "background-color": color }} className="prong" />
      <img src={url} />
      <div style={{ "background-color": color }} className="tear-background" />
    </div>
  );
}

const mapStateToProps = state => ({
  // loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Tear);
