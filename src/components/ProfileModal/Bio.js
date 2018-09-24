import React from "react";
import { reduxForm, Field, focus } from "redux-form";

import Input from "../sharedComponents/Input";
import { submitProfileForm, closeModal } from "../../actions/profile";

export class Bio extends React.Component {
  onSubmit(values) {
    this.props.dispatch(submitProfileForm("bio", values));
    this.props.dispatch(closeModal());
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
        <p className="form-description">
          This is a great place to list all of the things you’ve done, places
          you’ve worked, and the people worked with. You might also want to list
          some the supplies and equipment you can bring to a project.
        </p>
        <hr />
        <form
          className="modal-container display-form edit-form "
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        >
          <div style={{ width: "100%" }} className="search-field-holder ">
            <h2>Tell us about yourself</h2>

            <Field
              name="editBio"
              element="textarea"
              component={Input}
              label=""
              placeholder="After working with Twyla Tharp on Broadway, I was the ghost writer for Starwars episode 7 helping my buddy JJ. Abrams... etc."
            />
            <h2>Equipment / Supplies</h2>

            <Field
              name="editEquipment"
              element="textarea"
              component={Input}
              label=""
              placeholder="Guitar, Video Camera, Wigs... etc"
            />
            <div className="edit-buttons">
              <a
                href="NONE"
                onClick={e => {
                  e.preventDefault();
                  this.props.dispatch(closeModal());
                }}
              >
                Later
              </a>
              <button
                style={{ backgroundColor: "#F7EF6A", color: "#151515" }}
                type="submit"
                disabled={this.props.submitting}
              >
                Finish
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
  form: "Search",
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus("search", Object.keys(errors)[0]))
})(Bio);
