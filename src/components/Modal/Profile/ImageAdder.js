import React from "react";
import { Field } from "redux-form";
import { connect } from "react-redux";

import Input from "../../sharedComponents/Input";
import Tear from "../../sharedComponents/Tear";
import ImageUploader from "react-images-upload";

export class ImageAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: "",
      image: "",
      error: null
    };
    this.imageDrop = this.imageDrop.bind(this);
  }

  imageDrop(image) {
    console.log(image);
    this.setState({ image });
  }

  // This is used to test user image urls
  testUrlClick(e) {
    e.preventDefault();
    let url = document.getElementById("img_url").value;
    this.setState({ imageURL: url });

    const file = e.target.files;
    console.log(file[0]);

    fetch(`http://localhost:8080/api/images`, {
      method: "POST",
      body: file[0],
      headers: {
        "Content-Type": "multipart/form-data;"
      }
    })
      .then(res => res.json())
      .then(res => console.log(res));
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
            <ImageUploader
              withIcon={true}
              buttonText="Choose images"
              onChange={this.imageDrop}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
            />
            <input type="file" onChange={e => this.testUrlClick(e)} />
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
