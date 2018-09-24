import React from "react";
import { connect } from "react-redux";
import "./Tear.css";

// This is place holder image
let url = require("../../assets/images/TestImage.png");

export function Tear(props) {
  let colors = ["#F7EF6A", "#93C178", "#465C8B"];
  let color = colors[props.name.length % 3];

  let image = (
    <img style={{ height: "100%" }} src={url} alt={`${props.name}`} />
  );
  if (props.imageUrl) {
    // This code checks the dimensions of the image to be put
    // in the tear. Then it scales the image by it's shorter
    // dimension and centers in the larger one.
    let newImage = new Image();
    newImage.src = props.imageUrl;
    newImage.onload = function() {
      if (newImage.naturalWidth > newImage.naturalHeight) {
        return (
          <img
            style={{ height: "100%" }}
            src={props.imageUrl}
            alt={`${props.name}`}
          />
        );
      } else {
        return (
          <img
            style={{ width: "100%" }}
            src={props.imageUrl}
            alt={`${props.name}`}
          />
        );
      }
    };
    image = newImage.onload();
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
      style={{ display: "block", width: props.width, height: props.height }}
    >
      <div style={{ backgroundColor: color }} className="prong" />
      <div className="circle-cropper">{image}</div>

      <div style={{ backgroundColor: color }} className="tear-background" />
    </a>
  );
}

const mapStateToProps = state => ({
  // loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Tear);
