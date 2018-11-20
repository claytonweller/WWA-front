import React from "react";
import { connect } from "react-redux";
import "./progressBar.css";

import ProgressTear from "./ProgressTear.js";
import { Disciplines } from "./Disciplines";

export function ProgressBar(props) {
  const complete = {
    basic: false,
    disciplines: false,
    display: false,
    bio: false
  };

  if (props.user) {
    if (props.user) {
      complete.basic = true;
    }
    if (props.disciplines[0]) {
      complete.disciplines = true;
    }
    if (props.user.img_url && props.user.desired_projects) {
      complete.display = true;
    }
    if (props.user.bio && props.user.equipment) {
      complete.bio = true;
    }
  }

  return (
    <div className="progress-bar">
      <div className="progress-numbers">
        <ProgressTear
          number="1"
          complete={complete.basic}
          required={true}
          currentStep={props.editPage === "basic"}
        />
        <ProgressTear
          number="2"
          complete={complete.disciplines}
          required={true}
          currentStep={props.editPage === "disciplines"}
        />
        <div className="vertical-line" />
        <ProgressTear
          number="3"
          complete={complete.display}
          required={false}
          currentStep={props.editPage === "display"}
        />
        <ProgressTear
          number="4"
          complete={complete.bio}
          required={false}
          currentStep={props.editPage === "bio"}
        />
      </div>
      <div className="progress-required">
        <div>required</div>
        <div>optional</div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.auth.currentUser,
  disciplines: state.profile.disciplines
});

export default connect(mapStateToProps)(ProgressBar);
