import React from "react";
import { reduxForm, Field, focus, reset } from "redux-form";
import { login } from "../../actions/auth";
import { required } from "../../validators";

import Input from "../sharedComponents/Input";

export class LoginForm extends React.Component {
  onSubmit(values) {
    this.props
      .dispatch(login(values.email, values.password))
      .then(() => this.props.history.push("/search"))
      .catch(err => err);
  }

  render() {
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

            <button type="submit" disabled={this.props.submitting}>
              Next
            </button>
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
