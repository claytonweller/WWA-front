import React from "react";
import { reduxForm, Field, focus, reset } from "redux-form";
import { login } from "../../actions/auth";
import { required } from "../../validators";

import Input from "../sharedComponents/Input";

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  onSubmit(values) {
    this.props
      .dispatch(login(values.email, values.password))
      .then(() => this.props.history.push("/search"))
      .catch(err => this.setState({ error: err.errors._error }));
  }

  render() {
    return (
      <div className="">
        <hr />
        <form
          className="modal-form"
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        >
          <div className="simple-form">
            <div className="simple-fields">
              <Field
                name="email"
                type="email"
                component={Input}
                placeholder="HamletBoi1603@aol.com"
                label="Email"
                validate={[required]}
              />
              <Field
                name="password"
                type="password"
                component={Input}
                placeholder="********"
                label="Password"
                validate={[required]}
              />
            </div>
            <div className="modal-error">
              {this.state.error ? this.state.error : null}
            </div>
            <div className="simple-buttons">
              <a>Sign Up</a>
              <button type="submit" disabled={this.props.submitting}>
                submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "login",
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus("login", Object.keys(errors)[0]))
})(LoginForm);
