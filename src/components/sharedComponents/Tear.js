import React from "react";
import { connect } from "react-redux";
import "./Tear.css";

// This is place holder image
let url = require("../../assets/images/TestImage.png");

// These tears are used all of the place. They can have =>
//    A click action
//    An image
//    And are randomly colored by the length of the name

export function Tear(props) {
  let colors = ["#F7EF6A", "#93C178", "#465C8B"];
  let color = colors[props.name.length % 3];

  let image = url;

  if (props.imageUrl) {
    image = props.imageUrl;
  }

  let clickAction = e => {
    e.preventDefault();
    props.clickAction(e);
  };

  return (
    <a
      onClick={e => clickAction(e)}
      href="NONE"
      className="tear"
      style={{
        display: "block",
        position: "relative",
        width: props.width,
        height: props.height
      }}
    >
      <div style={{ backgroundColor: color }} className="prong" />
      <div
        className="circle-cropper"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          zIndex: 10
        }}
      />
      <div style={{ backgroundColor: color }} className="tear-background" />
    </a>
  );
}

const mapStateToProps = state => ({
  // loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Tear);
