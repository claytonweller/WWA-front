import React from "react";
import { connect } from "react-redux";
import "./BelowFold.css";

const phone = require("../../assets/images/phone-Search.png");
const heading = require("../../assets/images/find-artists.png");
const pip = require("../../assets/images/pip.png");

export function FindArtists(props) {
  return (
    <div className="landing-section image-left">
      <div className="landing-image">
        <img src={phone} alt="An example search in a mobile phone" />
      </div>
      <div className="landing-description">
        <img src={heading} alt="Find artists for your project" />
        <div>
          We all have big artistic dreams, but we can't do everything ourselves.
          Work With Aritst lets you easily search and contact artists who do
          exactly what you need.
          <ul style={{ listStyleImage: `url('${pip}')` }}>
            <li>
              You want to put on a flashy concert, but you have no idea how to
              find a lighting designer
            </li>
            <li>
              You're a writer who wants to find a director for your new script.
            </li>
            <li>
              Maybe you're a producer who's looking for a magician for an event.
            </li>
          </ul>
          There are countless wonderful artists out there who would love nothing
          more than to be contacted about projects. Find your team today!
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(FindArtists);
