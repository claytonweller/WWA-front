import React from "react";
import { connect } from "react-redux";

export function BasicInfo(props) {
  const findAge = DOB => {
    let now = new Date();
    let difference = (now - DOB) / 1000 / 60 / 60 / 24 / 365.25;
    return Math.floor(difference);
  };

  return (
    <div className="basic-info">
      <div>Age {findAge(props.DOB)}</div>
      <div> {props.location}</div>
      <button>Contact</button>
    </div>
  );
}

const mapStateToProps = state => ({
  // loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(BasicInfo);
