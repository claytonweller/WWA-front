import React from "react";
import { connect } from "react-redux";
import { openContactModal } from "../../../actions/profile";

// This only shows up in the 'Expanded' version
export function BasicInfo(props) {
  const findAge = DOB => {
    let now = new Date();
    let difference = (now - DOB) / 1000 / 60 / 60 / 24 / 365.25;
    return Math.floor(difference);
  };

  const contactClick = e => {
    props.dispatch(openContactModal(props.userId));
  };

  return (
    <div className="basic-info">
      <div>Age {findAge(props.DOB)}</div>
      <div> {props.location}</div>
      <button onClick={e => contactClick(e)}>Contact</button>
    </div>
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(BasicInfo);
