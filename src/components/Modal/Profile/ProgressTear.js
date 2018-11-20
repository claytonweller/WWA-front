import React from "react";
import { connect } from "react-redux";

export function ProgressTear(props) {
  let color = "#465C8B";
  let textColor = "white";
  let text = props.number;
  let opacity = 0.3;
  if (props.required === true) {
    color = "#F7EF6A";
    textColor = "#151515";
    opacity = 0.5;
  }
  if (props.complete) {
    text = "+";
  }
  if (props.currentStep === true) {
    opacity = 1;
  }

  return (
    <div style={{ opacity: opacity }} className="progress-tear">
      <div style={{ backgroundColor: color }} className="prong" />
      <h2 style={{ color: textColor }}>{text}</h2>
      <div style={{ backgroundColor: color }} className="tear-background" />
    </div>
  );
}

const mapStateToProps = state => ({
  // editPage: state.editPage
});

export default connect(mapStateToProps)(ProgressTear);
