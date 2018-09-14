import React from "react";
import { connect } from "react-redux";

export function NameTag(props) {
  return (
    <div>
      <h2>{props.name}</h2>
    </div>
  );
}

const mapStateToProps = state => ({
  // loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(NameTag);
