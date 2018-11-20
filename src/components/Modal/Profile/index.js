import React from "react";
import { connect } from "react-redux";
import "../Modal.css";

import ProgressBar from "./ProgressBar";
import BasicInfo from "./BasicInfo";
import Disciplines from "./Disciplines";
import Display from "./Display";
import Bio from "./Bio";

export function Profile(props) {
  let title;
  let modalForm;

  // props.editPage is passed any time the OpenModalPage function is used
  // Then this if statement decides which page to show.
  if (props.editPage === "disciplines") {
    title = "2 - Disciplines";
    modalForm = <Disciplines />;
  } else if (props.editPage === "display") {
    title = "3 - Display";
    modalForm = <Display history={props.history} />;
  } else if (props.editPage === "bio") {
    title = "4 - Bio";
    modalForm = <Bio history={props.history} />;
  } else {
    title = "1 - Basic Info";
    modalForm = <BasicInfo />;
  }

  return (
    <div>
      <div className="modal-header">
        <ProgressBar editPage={props.editPage} />
        <h2 className="modal-title">{title}</h2>
      </div>
      {modalForm}
    </div>
  );
}

Profile.defaultProps = {
  editPage: "basic"
};

const mapStateToProps = state => ({
  editPage: state.profile.editPage
});

export default connect(mapStateToProps)(Profile);
