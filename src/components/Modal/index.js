import React from "react";
import { connect } from "react-redux";
import "./Modal.css";
import { withRouter } from "react-router-dom";
import { closeModal } from "../../actions/profile";

import Login from "./Login";
import Profile from "./Profile";
import ContactForm from "./ContactForm";
import CloseX from "../sharedComponents/CloseX";

export function Modal(props) {
  let display;
  if (props.isVisible && window.innerWidth > 600) {
    display = "flex";
  }

  let contents = <Profile history={props.history} />;

  if (props.isLogin) {
    contents = <Login history={props.history} />;
  }

  if (props.isContactForm) {
    contents = <ContactForm focusedUser={props.focusedUser} />;
  }

  let closeX;

  const closeAction = () => {
    if (props.history.location.pathname !== "/search") {
      props.history.push("/search");
    }
    props.dispatch(closeModal());
  };

  if (props.currentUser && props.userDisciplines[0]) {
    closeX = <CloseX action={closeAction} />;
  }

  return (
    <div>
      <div
        style={{ display: display }}
        className="modal-background"
        hidden={!props.isVisible}
      >
        <div className="modal-border" hidden={!props.isVisible}>
          {closeX}
          {contents}
        </div>
      </div>
    </div>
  );
}

Modal.defaultProps = {
  isVisible: false,
  isLogin: false
};

const mapStateToProps = state => ({
  isVisible: state.profile.modalIsVisible,
  isLogin: state.profile.isLogin,
  isContactForm: state.profile.isContactForm,
  focusedUser: state.profile.focusedUser,
  currentUser: state.auth.currentUser,
  userDisciplines: state.profile.disciplines
});

// export default connect(mapStateToProps)(Modal);
export default connect(mapStateToProps)(withRouter(Modal));
