import React from "react";
import { reduxForm, Field, focus, reset } from "redux-form";
import { login } from "../../actions/auth";

import Input from "../sharedComponents/Input";

export class LoginForm extends React.Component {
  onSubmit(values) {
    console.log(values);
    this.props
      .dispatch(login(values.email, values.password))
      .then(() => this.props.history.push("/search"));

    this.props.dispatch(reset("login"));
  }

  render() {
    let successMessage;
    if (this.props.submitSucceeded) {
      successMessage = (
        <div className="message message-success">
          Message submitted successfully
        </div>
      );
    }

    let errorMessage;
    if (this.props.error) {
      errorMessage = (
        <div className="message message-error">{this.props.error}</div>
      );
    }
    // This is the dispatch thing for the form.
    // onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}

    return (
      <div className="">
        <hr />
        <form
          className="modal-form"
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        >
          <div className="search-field-holder">
            <Field
              name="email"
              type="email"
              component={Input}
              placeholder="HamletBoi1603@aol.com"
              label="Email"
            />
            <Field
              name="password"
              type="password"
              component={Input}
              placeholder="********"
              label="Password"
            />

            <button type="submit" disabled={this.props.submitting}>
              Next
            </button>
          </div>

          {successMessage}
          {errorMessage}
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
