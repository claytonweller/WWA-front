import React from "react";
import { Field } from "redux-form";
import { connect } from "react-redux";

import Input from "../../sharedComponents/Input";
import Tear from "../../sharedComponents/Tear";
import { updateUserImage } from "../../../actions/profile";

export class ImageAdder extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     uploading: false,
  //     error: false
  //   };
  // }

  uploadImage(e) {
    e.preventDefault();
    this.props.dispatch(updateUserImage(e));
  }

  render() {
    let display = () => {
      if (this.props.imgUploading) {
        return <p>Image Uploading...</p>;
      } else {
        return (
          <div className="img-url-test">
            <Field
              name="img_url"
              type="text"
              placeholder="www.imgur.com/mysickpic"
              component={Input}
              label="Image URL"
            />
            <input
              type="file"
              accept="image/*"
              onChange={e => this.uploadImage(e)}
            />
          </div>
        );
      }
    };
    let err = () => {
      if (this.props.imgUploadError) {
        return <p style={{ color: "red" }}>image too large</p>;
      }
      return null;
    };

    return (
      <div className="">
        <h2>Your picture</h2>
        <p style={{ margin: 5 }}>
          Grab a url of an image you like paste it here. Facebook profile images
          work great.
        </p>
        <div className="image-interface">
          <Tear
            clickAction={() => console.log("boop")}
            length="35%"
            width="35%"
            name="testImage"
            position="relative"
            imageUrl={this.props.img_url}
          />
          {display()}
        </div>
        {err()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  if (state.auth.currentUser) {
    return {
      initialValues: {
        img_url: state.auth.currentUser.img_url,
        imgUploading: false,
        imgUploadError: null
      },
      img_url: state.auth.currentUser.img_url,
      imgUploading: state.profile.imgUploading,
      imgUploadError: state.profile.imgUploadError
    };
  }
  return { initialValues: {} };
};

ImageAdder = connect(mapStateToProps)(ImageAdder);

export default ImageAdder;
