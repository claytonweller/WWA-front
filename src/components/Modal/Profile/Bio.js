import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, focus, reset } from "redux-form";

import Input from "../../sharedComponents/Input";
import { closeModal, updateUser } from "../../../actions/profile";

export class Bio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  onSubmit(values) {
    this.props
      .dispatch(updateUser(values))
      .then(() => this.props.dispatch(reset("bio")))
      .then(() => this.props.history.push("/search"))
      .catch(err => this.setState({ error: err.errors._error }));
  }

  render() {
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
          <div
            style={{ width: "100%" }}
            className="bio-form search-field-holder "
          >
            <h2>Tell us about yourself</h2>

            <Field
              name="bio"
              element="textarea"
              component={Input}
              label=""
              placeholder="After working with Twyla Tharp on Broadway, I was the ghost writer for Starwars episode 7 helping my buddy JJ. Abrams... etc."
            />
            <h2>Equipment / Supplies</h2>

            <Field
              name="equipment"
              element="textarea"
              component={Input}
              label=""
              placeholder="Guitar, Video Camera, Wigs... etc"
            />
            <div className="modal-error">
              {this.state.error ? this.state.error : null}
            </div>
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
        </form>
      </div>
    );
  }
}

Bio = reduxForm({
  form: "bio",
  enableReinitialize: true,
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus("bio", Object.keys(errors)[0]))
})(Bio);

const mapStateToProps = state => {
  if (state.auth.currentUser) {
    return {
      initialValues: {
        bio: state.auth.currentUser.bio,
        equipment: state.auth.currentUser.equipment
      },
      state
    };
  }
};

Bio = connect(mapStateToProps)(Bio);

export default Bio;
