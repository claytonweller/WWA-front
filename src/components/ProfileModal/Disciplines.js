import React from "react";
import { reduxForm, Field, focus } from "redux-form";
import Input from "../sharedComponents/Input";
import SingleDiscipline from "./SingleDiscipline";
import years from "./allTheYears";

export class Disciplines extends React.Component {
  onSubmit(values) {
    console.log(values);
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
          Add as many artistic disciplines as you like. These are how people
          find artists in our app, the more you add, the more searches you’ll
          show up in. You can update these at any time.
        </p>
        <hr />
        <div className="modal-container">
          <div className="disciplines-card modal-left">
            <h3 className="disciplines-title">Your Disciplines</h3>
            <SingleDiscipline />
            <SingleDiscipline />
            <SingleDiscipline />
            <button>Add</button>
          </div>

          <form
            className="disciplines-form edit-form modal-right"
            onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
          >
            <h2>Add / Edit a Discipline</h2>
            <div className="search-field-holder">
              <Field
                name="editDiscipline"
                type="text"
                component={Input}
                placeholder="Actor, Set Designer... etc"
                label="Discipline"
              />
              <Field
                name="editExperience"
                element="select"
                component={Input}
                label="When Did you start doing this?"
                options={years}
              />
              <Field
                name="editReward"
                element="select"
                component={Input}
                label="Preferred reward for your time and expertise in this discipline"
                options={["For Fun", "For Pay", "Depends on project"]}
              />
              <Field
                name="editActive"
                element="select"
                component={Input}
                label="Are you actively seeking projects in this discipline?"
                options={["No", "Yes"]}
              />
              <div className="edit-buttons">
                <a href="NONE">Cancel</a>
                <button type="submit" disabled={this.props.submitting}>
                  Save
                </button>
              </div>
            </div>

            {successMessage}
            {errorMessage}
          </form>
        </div>
        <hr
          style={{
            marginBottom: "55px"
          }}
        />

        <button
          style={{
            width: "150px",
            position: "absolute",
            right: "20px",
            bottom: "20px"
          }}
        >
          Next
        </button>
      </div>
    );
  }
}

export default reduxForm({
  form: "Search",
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus("search", Object.keys(errors)[0]))
})(Disciplines);
