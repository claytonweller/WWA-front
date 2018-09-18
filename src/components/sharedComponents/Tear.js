import React from "react";
import { connect } from "react-redux";
import "./Tear.css";

// This is place holder image
let url = require("../../assets/images/TestImage.png");

export function Tear(props) {
  let colors = ["#F7EF6A", "#93C178", "#465C8B"];
  let color = colors[props.name.length % 3];

  let image = <img src={url} alt={`${props.name}`} />;

  return (
    <div className="tear" style={{ width: props.width, height: props.height }}>
      <div style={{ backgroundColor: color }} className="prong" />
      {image}
      <div style={{ backgroundColor: color }} className="tear-background" />
    </div>
  );
}

const mapStateToProps = state => ({
  // loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Tear);
