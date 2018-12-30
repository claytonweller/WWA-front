import React from "react";
import { Field } from "redux-form";
import { connect } from "react-redux";

import Input from "../../sharedComponents/Input";
import Tear from "../../sharedComponents/Tear";

export class ImageAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: "",
      image: "",
      error: null
    };
  }

  // This is used to test user image urls
  testUrlClick(e) {
    e.preventDefault();

    const file = e.target.files[0];
    console.log(file.size);

    // Check for file size in MB
    if (file.size / 1024 / 1024 > 0.5) {
      throw "TOO BIG!";
    }

    let formData = new FormData();
    formData.append("imageFile", file);

    const options = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
      }
    };

    fetch(`http://localhost:8080/api/images/`, options)
      .then(res => res.json())
      .then(res => this.setState({ imageURL: res }))
      .catch(err => console.log("BOOP ERROR BOOP BOOP"));
    // .then(images => {
    //   this.setState({
    //     uploading: false,
    //     images
    //   });
    // });
  }

  render() {
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
            imageUrl={this.props.imageURL}
          />
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
              onChange={e => this.testUrlClick(e)}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  if (state.auth.currentUser) {
    return {
      initialValues: {
        img_url: state.auth.currentUser.img_url
      }
    };
  }
  return { initialValues: {} };
};

ImageAdder = connect(mapStateToProps)(ImageAdder);

export default ImageAdder;
