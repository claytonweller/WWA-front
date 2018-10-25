import React from "react";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";

export function Login(props) {
  return (
    <div>
      <div className="modal-header">
        <h2 className="modal-title">Log In </h2>
      </div>
      <LoginForm history={props.history} />
    </div>
  );
}

Login.defaultProps = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Login);
