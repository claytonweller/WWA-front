import React from "react";
import { connect } from "react-redux";
// import requiresLogin from "./requires-login";
import { fetchProtectedData } from "../actions/protected-data";

export class ClassExample extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
  }

  render() {
    return (
      <div>
        <h2>CLASS</h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    // username: state.auth.currentUser.username,
    // name: `${currentUser.firstName} ${currentUser.lastName}`,
    // protectedData: state.protectedData.data
  };
};

export default /*requiresLogin()*/ connect(mapStateToProps)(ClassExample);
