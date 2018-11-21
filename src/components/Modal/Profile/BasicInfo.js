import React from "react";
import { reduxForm, Field, focus, reset } from "redux-form";
import { connect } from "react-redux";

import { postUser, updateUser } from "../../../actions/profile";
import Input from "../../sharedComponents/Input";
import states from "./allTheStates";
import { required } from "../../../validators";

export class BasicInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  onSubmit(values) {
    // For some reason the REDUX form validation
    // was not playing well. So I just used straight up
    // state to make it work
    // TODO: Figure out redux form validator
    if (values.password !== values.password2) {
      return this.setState({ error: "Passwords do not match" });
    }

    if (values.password.length < 10) {
      return this.setState({
        error: "Password must be at least 10 characters long"
      });
    }

    // If the user is already signed in we just update their info
    // Otherwise we create a new user
    if (!this.props.currentUser) {
      return this.props
        .dispatch(postUser(values))
        .then(() => this.props.dispatch(reset("basic")))
        .catch(err => this.setState({ error: err.errors._error }));
    }
    this.props
      .dispatch(updateUser(values, "disciplines"))
      .then(() => this.props.dispatch(reset("basic")))
      .catch(err => this.setState({ error: err.errors._error }));
  }

  render() {
    let submitLogic = this.props.pristine || this.props.submitting;

    if (this.props.currentUser) {
      submitLogic = this.props.submitting;
    }

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
                validate={[required]}
              />
              <Field
                name="last_name"
                type="text"
                component={Input}
                placeholder="Shakespeare"
                label="Last Name"
                validate={[required]}
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
                  placeholder="XX"
                  options={states}
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
              <Field
                name="password2"
                type="password"
                component={Input}
                placeholder="********"
                label="Re-type Password"
              />

              <button type="submit" disabled={submitLogic}>
                Next
              </button>
              <div className="modal-error">
                {this.state.error ? this.state.error : null}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

BasicInfo = reduxForm({
  form: "basic",
  enableReinitialize: true,
  onSubmitFail: (errors, dispatch) => {
    dispatch(focus("basic", Object.keys(errors)[0]));
  }
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
        state: state.auth.currentUser.state,
        password: ""
      }
    };
  }
  return { initialValues: {} };
};

BasicInfo = connect(mapStateToProps)(BasicInfo);

export default BasicInfo;
