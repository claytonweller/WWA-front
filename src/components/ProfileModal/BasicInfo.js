import React from "react";
import { reduxForm, Field, focus } from "redux-form";
import { submitBasicInfo, openModalPage } from "../../actions/profile";

import Input from "../sharedComponents/Input";
import states from "./allTheStates";

export class BasicInfo extends React.Component {
  onSubmit(values) {
    console.log(values);
    this.props.dispatch(openModalPage("disciplines"));
    this.props.dispatch(submitBasicInfo(values));
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
            <div className="modal-left">
              <Field
                name="firstName"
                type="text"
                component={Input}
                placeholder="Billy"
                label="First Name"
              />
              <Field
                name="lastName"
                type="text"
                component={Input}
                placeholder="Shakespeare"
                label="Last Name"
              />
              <div className="basic-location">
                <Field
                  name="city"
                  type="text"
                  component={Input}
                  placeholder="Stratford Upon Avon"
                  label="City"
                />
                <Field
                  name="state"
                  element="select"
                  component={Input}
                  label="State"
                  options={states}
                />
              </div>
              <Field
                name="DOB"
                type="date"
                component={Input}
                label="Date of Birth"
              />
            </div>
            <div className="modal-right">
              <Field
                name="email"
                type="email"
                component={Input}
                placeholder="HamletBoi1603@aol.com"
                label="Email - We will never give this out. All communications are opt in"
              />
              <Field
                name="password"
                type="password"
                component={Input}
                placeholder="********"
                label="Password"
              />
              <Field
                name="password2"
                type="password"
                component={Input}
                placeholder="********"
                label="Re-type Password"
              />

              <button type="submit" disabled={this.props.submitting}>
                Next
              </button>
            </div>
          </div>
          {successMessage}
          {errorMessage}
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "basic",
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus("search", Object.keys(errors)[0]))
})(BasicInfo);
