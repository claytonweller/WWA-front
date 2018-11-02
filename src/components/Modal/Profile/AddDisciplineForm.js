import React from "react";
import { reduxForm, Field, focus, reset } from "redux-form";
import Input from "../../sharedComponents/Input";
import { connect } from "react-redux";
import years from "./allTheYears";

import {
  submitProfileForm,
  closeAddDisciplineForm,
  postUserDiscipline
} from "../../../actions/profile";

export class AddDisciplineForm extends React.Component {
  disciplineSubmit(values) {
    console.log(values);
    values.type_id = this.props.disciplineTypes.find(
      typeObject => typeObject.type === values.type
    ).type_id;
    this.props.dispatch(submitProfileForm("discipline", values));
    this.props.dispatch(postUserDiscipline(values));
    this.props.dispatch(closeAddDisciplineForm());
    this.props.dispatch(reset("Discipline"));
  }

  cancelClick(e) {
    e.preventDefault();
    this.props.dispatch(closeAddDisciplineForm());
    this.props.dispatch(reset("Discipline"));
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
      <form
        hidden={this.props.formIshidden}
        className="disciplines-form edit-form"
        onSubmit={this.props.handleSubmit(values =>
          this.disciplineSubmit(values)
        )}
      >
        <h2>Add / Edit a Discipline</h2>
        <div className="search-field-holder">
          <Field
            name="type"
            type="text"
            element="select"
            component={Input}
            label="Discipline"
            options={this.props.disciplineTypes.map(
              typeObject => typeObject.type
            )}
          />
          <Field
            name="experience"
            element="select"
            component={Input}
            label="When Did you start doing this?"
            options={years}
          />

          <Field
            name="reward"
            element="select"
            component={Input}
            label="Preferred reward for your time and expertise in this discipline"
            options={["Reward?", "For Fun", "For Pay", "Depends on project"]}
          />
          <Field
            name="active"
            element="select"
            component={Input}
            label="Are you actively seeking projects in this discipline?"
            options={["Active?", "No", "Yes"]}
          />

          <div className="edit-buttons">
            <a href="NONE" onClick={e => this.cancelClick(e)}>
              Cancel
            </a>
            <button type="submit" disabled={this.props.submitting}>
              Save
            </button>
          </div>
        </div>

        {successMessage}
        {errorMessage}
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    disciplineTypes: state.profile.disciplineTypes
  };
};

AddDisciplineForm = connect(mapStateToProps)(AddDisciplineForm);

export default reduxForm({
  form: "Discipline",
  onSubmitFail: (errors, dispatch) => {
    dispatch(focus("Discipline", Object.keys(errors)[0]));
  }
})(AddDisciplineForm);
