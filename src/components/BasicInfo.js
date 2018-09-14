import React from "react";
import { connect } from "react-redux";

export function BasicInfo(props) {
  return (
    <div>
      <button>Contact</button>
      <span>{props.DOB}</span>
      <span>{props.location}</span>
    </div>
  );
}

const mapStateToProps = state => ({
  // loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(BasicInfo);
