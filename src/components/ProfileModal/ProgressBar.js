import React from "react";
import { connect } from "react-redux";
import "./progressBar.css";

import ProgressTear from "./ProgressTear.js";

export function ProgressBar(props) {
  return (
    <div className="progress-bar">
      <div className="progress-numbers">
        <ProgressTear
          number="1"
          complete={props.basicInfo.complete}
          required={true}
          currentStep={props.editPage === "basic"}
        />
        <ProgressTear
          number="2"
          complete={props.disciplines[0] !== undefined}
          required={true}
          currentStep={props.editPage === "disciplines"}
        />
        <div className="vertical-line" />
        <ProgressTear
          number="3"
          complete={props.display.complete}
          required={false}
          currentStep={props.editPage === "display"}
        />
        <ProgressTear
          number="4"
          complete={props.bio.complete}
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

ProgressBar.defaultProps = {
  // basicInfo: { complete: false, values: {} },
  // disciplines: [],
  // display: { complete: false, values: {} },
  // bio: { complete: false, values: {} }
};

const mapStateToProps = state => ({
  // basicInfo: state.basicInfo,
  // disciplines: state.disciplines,
  // display: state.display,
  // bio: state.bio
});

export default connect(mapStateToProps)(ProgressBar);
