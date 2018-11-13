import React from "react";
import { reduxForm, Field, focus } from "redux-form";
import Input from "../sharedComponents/Input";
import { notFirstOption, required } from "../../validators";
import {
  searchArtists,
  updateExperienceFilter,
  udpateRewardFilter
} from "../../actions/search";

export class SearchForm extends React.Component {
  onSubmit(values) {
    this.props.dispatch(searchArtists(values));
  }

  render() {
    // TODO success/Error
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
      <div className="search-form-holder">
        <form
          className="search-form"
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        >
          <label className="search-label">
            What kind of artist are you looking for?
          </label>
          <div className="search-field-holder">
            <Field
              name="discipline"
              type="text"
              element="select"
              component={Input}
              placeholder="Choose a Discipline"
              options={this.props.disciplineTypes}
              label=""
              validate={required}
            />
            <Field
              name="experience"
              element="select"
              component={Input}
              action={updateExperienceFilter}
              label=""
              options={[
                "Experience (all)",
                "2+ years",
                "5+ years",
                "10+ years"
              ]}
            />
            <Field
              name="reward"
              element="select"
              component={Input}
              action={udpateRewardFilter}
              label=""
              options={[
                "Reward (any)",
                "For Fun",
                "For Pay",
                "Depends on project"
              ]}
            />
            <button type="submit" disabled={this.props.submitting}>
              Search
            </button>
          </div>
        </form>
        {errorMessage}
        <div className="bar-gradient" />
      </div>
    );
  }
}

export default reduxForm({
  form: "Search",
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus("search", Object.keys(errors)[0]))
})(SearchForm);
