import React from "react";
import { reduxForm, Field, focus, reset } from "redux-form";

import Input from "../sharedComponents/Input";
import { sendMessage } from "../../actions/profile";

export class ContactForm extends React.Component {
  onSubmit(values) {
    values.artistId = this.props.focusedUser;
    this.props.dispatch(sendMessage(values));
    this.props.dispatch(reset("contact"));
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

    return (
      <div className="">
        <h1>Contact</h1>
        <hr />
        <form
          className="modal-form"
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        >
          <div className="search-field-holder">
            <Field
              name="subject"
              type="text"
              component={Input}
              placeholder="Work With Me!"
              label="Subject"
            />
            <Field
              name="contact"
              type="textarea"
              component={Input}
              placeholder="Hi! I'd love to work with you!"
              label="What do you want to say?"
            />

            <button type="submit" disabled={this.props.submitting}>
              Send
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
  form: "contact",
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus("contact", Object.keys(errors)[0]))
})(ContactForm);
