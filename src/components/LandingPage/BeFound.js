import React from "react";
import { connect } from "react-redux";
import "./BelowFold.css";

const phone = require("../../assets/images/sample-artists.png");
const heading = require("../../assets/images/be-found.png");
const pip = require("../../assets/images/pip.png");

export function BeFound(props) {
  return (
    <div className="landing-section image-right">
      <div className="landing-description">
        <img src={heading} alt="Find artists for your project" />
        <div>
          You are an artist. You love making art. You want to do more projects,
          and work with new people, but it's exhausting putting yourself out
          there. Work With Artists makes finding projects way easier:
          <ul style={{ listStyleImage: `url('${pip}')` }}>
            <li>Create a profile with your skills and resume.</li>
            <li>
              Tell people about the kinds of projects you want to work on.
            </li>
            <li>Get contacted by people who want YOU specifically.</li>
          </ul>
          All communications are opt in, and we will never give away your email.
          It's easy, updateable, and might lead to some truly wonderful
          connections.
        </div>
      </div>
      <div className="landing-image">
        <img
          src={phone}
          alt="A series of sample users from the app. They have a variety of races and genders"
        />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(BeFound);
