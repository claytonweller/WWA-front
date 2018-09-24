import React from "react";
import { reduxForm, Field, focus } from "redux-form";
import Input from "../sharedComponents/Input";

export class SearchForm extends React.Component {
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
              component={Input}
              placeholder="Actor, Set Designer... etc"
              label=""
            />
            <Field
              name="experience"
              element="select"
              component={Input}
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
