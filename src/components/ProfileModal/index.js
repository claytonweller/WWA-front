import React from "react";
import { connect } from "react-redux";
import "./profileModal.css";

import ProgressBar from "./ProgressBar";
import BasicInfo from "./BasicInfo";
import Disciplines from "./Disciplines";
import Display from "./Display";
import Bio from "./Bio";

export function ProfileModal(props) {
  let title;
  let modalForm;

  if (props.editPage === "disciplines") {
    title = "2 - Disciplines";
    modalForm = <Disciplines />;
  } else if (props.editPage === "display") {
    title = "3 - Display";
    modalForm = <Display />;
  } else if (props.editPage === "bio") {
    title = "4 - Bio";
    modalForm = <Bio />;
  } else {
    title = "1 - Basic Info";
    modalForm = <BasicInfo />;
  }

  let display;
  if (props.isVisible && window.innerWidth > 600) {
    display = "flex";
  }

  return (
    <div
      style={{ display: display }}
      className="modal-background"
      hidden={!props.isVisible}
    >
      <div className="modal-border" hidden={!props.isVisible}>
        <div className="modal-header">
          <ProgressBar
            basicInfo={props.basicInfo}
            disciplines={props.disciplines}
            display={props.display}
            bio={props.bio}
            editPage={props.editPage}
          />
          <h2 className="modal-title">{title}</h2>
        </div>
        {modalForm}
      </div>
    </div>
  );
}

ProfileModal.defaultProps = {
  editPage: "basic",
  isVisible: false,
  basicInfo: { complete: false, values: {} },
  disciplines: [],
  display: { complete: false, values: {} },
  bio: { complete: false, values: {} }
};

const mapStateToProps = state => ({
  editPage: state.profile.editPage,
  isVisible: state.profile.modalIsVisible,
  basicInfo: state.basicInfo,
  disciplines: state.disciplines,
  display: state.display,
  bio: state.bio
});

export default connect(mapStateToProps)(ProfileModal);
