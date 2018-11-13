import React from "react";
import { reduxForm, Field, focus, reset } from "redux-form";
import Input from "../../sharedComponents/Input";
import { connect } from "react-redux";
import years from "./allTheYears";

import {
  submitProfileForm,
  closeAddDisciplineForm,
  postUserDiscipline,
  createNewUserDiscipline
} from "../../../actions/profile";
import { required, notFirstOption } from "../../../validators";

export class AddDisciplineForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addingNewDisciplineType: false
    };
  }

  disciplineSubmit(values) {
    if (!this.state.addingNewDisciplineType) {
      values.type_id = this.props.disciplineTypes.find(
        typeObject => typeObject.type === values.type
      ).type_id;
      this.props.dispatch(postUserDiscipline(values));
    } else {
      this.props.dispatch(createNewUserDiscipline(values));
    }
    this.props.dispatch(submitProfileForm("discipline", values));
    this.props.dispatch(closeAddDisciplineForm());
    this.props.dispatch(reset("discipline"));
    console.log(values);
  }

  cancelClick(e) {
    e.preventDefault();
    this.props.dispatch(closeAddDisciplineForm());
    this.props.dispatch(reset("discipline"));
  }

  render() {
    // let successMessage;
    // if (this.props.submitSucceeded) {
    //   successMessage = (
    //     <div className="message message-success">
    //       Message submitted successfully
    //     </div>
    //   );
    // }

    // let errorMessage;
    // if (this.props.error) {
    //   errorMessage = (
    //     <div className="message message-error">{this.props.error}</div>
    //   );
    // }

    const populatedOptions = this.props.disciplineTypes.map(
      typeObject => typeObject.type
    );

    let newDisciplineTypeField;
    if (this.state.addingNewDisciplineType) {
      newDisciplineTypeField = (
        <Field
          name="new_type"
          type="text"
          component={Input}
          placeholder="Contortionist, Dancer, Puppeteer... etc"
          label="New Discipline"
        />
      );
    } else {
      newDisciplineTypeField = null;
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
            handleChange={value => {
              if (value === "--Other/Not Listed--") {
                this.setState({ addingNewDisciplineType: true });
              } else {
                this.setState({ addingNewDisciplineType: false });
              }
            }}
            component={Input}
            label="Discipline"
            options={["--Other/Not Listed--", ...populatedOptions]}
            placeholder="Discipline?"
          />
          {newDisciplineTypeField}
          <Field
            name="experience"
            element="select"
            component={Input}
            label="When Did you start doing this?"
            options={years}
            validate={(value, allvalues, props, name) =>
              console.log(value, allvalues, props, name)
            }
            placeholder="Experience?"
          />

          <Field
            name="reward"
            element="select"
            component={Input}
            label="Preferred reward for your time and expertise in this discipline"
            options={["For Fun", "For Pay", "Depends on project"]}
            placeholder="Reward?"
          />
          <Field
            name="active"
            element="select"
            component={Input}
            label="Are you actively seeking projects in this discipline?"
            options={["No", "Yes"]}
            placeholder="Active?"
          />

          <div className="edit-buttons">
            <a href="NONE" onClick={e => this.cancelClick(e)}>
              Cancel
            </a>
            <button
              type="submit"
              disabled={this.props.submitting || this.props.pristine}
            >
              Save
            </button>
          </div>
        </div>

        {/* {successMessage}
        {errorMessage} */}
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
  form: "discipline",
  enableReinitialize: true,
  onSubmitFail: (errors, dispatch) => {
    dispatch(focus("discipline", Object.keys(errors)[0]));
  }
})(AddDisciplineForm);
