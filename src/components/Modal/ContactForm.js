import React from "react";
import { reduxForm, Field, focus } from "redux-form";

import Input from "../sharedComponents/Input";
import { sendMessage, closeModal } from "../../actions/profile";
import { required, nonEmpty } from "../../validators";

export class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  // Send an email to the current focused user
  onSubmit(values) {
    values.artistId = this.props.focusedUser;
    this.props
      .dispatch(sendMessage(values))
      .catch(err => this.setState({ error: err }));
  }

  render() {
    return (
      <div className="">
        <h1 style={{ textAlign: "center" }}>Contact</h1>
        <hr />
        <form
          className="modal-form"
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        >
          <div className="simple-form">
            <Field
              name="subject"
              type="text"
              component={Input}
              placeholder="Work With Me!"
              label="Subject"
              validate={[required, nonEmpty]}
            />
            <Field
              name="contact"
              element="textarea"
              component={Input}
              placeholder="Hi! I'd love to work with you!"
              label="What do you want to say?"
              validate={[required, nonEmpty]}
            />
            <div className="modal-error">
              {this.state.error ? this.state.error : null}
            </div>
            <div className="simple-buttons">
              <a
                href="none"
                onClick={e => {
                  e.preventDefault();
                  this.props.dispatch(closeModal());
                }}
              >
                Cancel
              </a>
              <button type="submit" disabled={this.props.submitting}>
                Send
              </button>
            </div>
          </div>
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
