import React from "react";
import { reduxForm, Field, focus, reset } from "redux-form";
import { connect } from "react-redux";

import Input from "../../sharedComponents/Input";
import Tear from "../../sharedComponents/Tear";
import { closeModal, updateUser } from "../../../actions/profile";

export class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: "",
      error: null
    };
  }

  onSubmit(values) {
    this.props
      .dispatch(updateUser(values, "bio"))
      .then(() => this.props.dispatch(reset("display")))
      .catch(err => this.setState({ error: err.errors._error }));
  }

  // This is used to test user image urls
  testUrlClick(e) {
    e.preventDefault();
    let url = document.getElementById("img_url").value;
    this.setState({ imageURL: url });
  }

  render() {
    return (
      <div className="">
        <p className="form-description">
          Take a moment to make a first impression. When people search on Work
          With artists these things are the first things people will see.
        </p>
        <hr />
        <div className="">
          <form
            className="modal-container display-form edit-form modal-right"
            onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
          >
            <div className="display modal-left">
              <h2>Your picture</h2>
              <p style={{ margin: 5 }}>
                Grab a url of an image you like paste it here. Facebook profile
                images work great.
              </p>
              <div className="image-interface">
                <Tear
                  clickAction={console.log}
                  length="35%"
                  width="35%"
                  name="testImage"
                  imageUrl={this.state.imageURL}
                />
                <div className="img-url-test">
                  <Field
                    name="img_url"
                    type="text"
                    placeholder="www.imgur.com/mysickpic"
                    component={Input}
                    label="Image URL"
                  />
                  <button onClick={e => this.testUrlClick(e)}>Test URL</button>
                </div>
              </div>
            </div>
            <hr className="display-split" />
            <div className="search-field-holder modal-right">
              <h2>Desired Projects</h2>

              <Field
                name="desired_projects"
                element="textarea"
                component={Input}
                label="What kind of projects are you most excited to work on?"
                placeholder="In less than ### characters talk about the kind of work that most excites you. This will be people’s first impression of you."
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
                    this.props.history.push("/search");
                  }}
                >
                  Later
                </a>
                <button
                  style={{ backgroundColor: "#F7EF6A", color: "#151515" }}
                  type="submit"
                  disabled={this.props.submitting}
                >
                  Next
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Display = reduxForm({
  form: "display",
  enableReinitialize: true,
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus("display", Object.keys(errors)[0]))
})(Display);

const mapStateToProps = state => {
  if (state.auth.currentUser) {
    return {
      initialValues: {
        img_url: state.auth.currentUser.img_url,
        desired_projects: state.auth.currentUser.desired_projects
      }
    };
  }
  return { initialValues: {} };
};

Display = connect(mapStateToProps)(Display);

export default Display;
