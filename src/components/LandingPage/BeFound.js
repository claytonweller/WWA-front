import React from "react";
import { connect } from "react-redux";

const phone = require("../../assets/images/phone-Search.png");
const heading = require("../../assets/images/be-found.png");

export function BeFound(props) {
  return (
    <div className="landing-section image-right">
      <div className="landing-description">
        <img src={heading} alt="Find artists for your project" />
        <div>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum
        </div>
      </div>
      <div className="landing-image">
        <img src={phone} alt="An example search in a mobile phone" />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(BeFound);
