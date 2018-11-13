import React from "react";
import { reduxForm, Field, focus, reset } from "redux-form";
import { connect } from "react-redux";

import { postUser, updateUser } from "../../../actions/profile";
import Input from "../../sharedComponents/Input";
import states from "./allTheStates";

export class BasicInfo extends React.Component {
  onSubmit(values) {
    if (!this.props.currentUser) {
      return this.props.dispatch(postUser(values));
    }
    this.props.dispatch(updateUser(values));
    this.props.dispatch(reset("basic"));
  }

  render() {
    let successMessage;
    if (this.props.submitSucceeded) {
      successMessage = <div className="message message-success">Submitted</div>;
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
                name="first_name"
                type="text"
                component={Input}
                placeholder="Billy"
                label="First Name"
              />
              <Field
                name="last_name"
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
                  options={["XX", ...states]}
                />
              </div>
              <Field
                name="dob"
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

              <button
                type="submit"
                disabled={this.props.pristine || this.props.submitting}
              >
                Next
              </button>
            </div>
          </div>
          {/* MAYBE I'll add theses in again later... but for now they're garbage */}
          {/* {successMessage}
          {errorMessage} */}
        </form>
      </div>
    );
  }
}

BasicInfo = reduxForm({
  form: "basic",
  enableReinitialize: true,
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus("basic", Object.keys(errors)[0]))
})(BasicInfo);

const mapStateToProps = state => {
  if (state.auth.currentUser) {
    return {
      currentUser: state.auth.currentUser,
      initialValues: {
        email: state.auth.currentUser.email,
        first_name: state.auth.currentUser.first_name,
        last_name: state.auth.currentUser.last_name,
        city: state.auth.currentUser.city,
        state: state.auth.currentUser.state
      }
    };
  }
  return { initialValues: {} };
};

BasicInfo = connect(mapStateToProps)(BasicInfo);

export default BasicInfo;
