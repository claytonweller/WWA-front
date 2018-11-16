import React from "react";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";

export function Login(props) {
  return (
    <div>
      <div className="modal-header">
        <h2 className="modal-title">Log In </h2>
      </div>
      <LoginForm history={props.history} error={props.error} />
    </div>
  );
}

Login.defaultProps = {
  error: null
};

const mapStateToProps = state => ({
  error: state.auth.error
});

export default connect(mapStateToProps)(Login);
