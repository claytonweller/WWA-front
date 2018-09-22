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
          complete={true}
          required={true}
          currentStep={false}
        />
        <ProgressTear
          number="2"
          complete={false}
          required={true}
          currentStep={true}
        />
        <div className="vertical-line" />
        <ProgressTear
          number="3"
          complete={false}
          required={false}
          currentStep={false}
        />
        <ProgressTear
          number="4"
          complete={false}
          required={false}
          currentStep={false}
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
  // editPage: state.editPage
});

export default connect(mapStateToProps)(ProgressBar);
