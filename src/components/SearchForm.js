import React from "react";
import { reduxForm, Field, SubmissionError, focus } from "redux-form";
import Input from "./Input";

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
      <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        {successMessage}
        {errorMessage}
        <Field
          name="discipline"
          type="text"
          component={Input}
          placeholder="Actor, Set Designer... etc"
          label="What kind of artists are you looking for?"
        />
        <Field
          name="experience"
          element="select"
          component={Input}
          label="Experience"
          options={["Experience (all)", "2+ years", "5+ years", "10+ years"]}
        />
        <Field
          name="reward"
          element="select"
          component={Input}
          label="Reward"
          options={[
            "Reward (any)",
            "For Fun",
            "For Pay",
            "Depends on the project"
          ]}
        />
        <button type="submit" disabled={this.props.submitting}>
          Search
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: "Search",
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus("search", Object.keys(errors)[0]))
})(SearchForm);
