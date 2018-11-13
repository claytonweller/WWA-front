import React from "react";
import { connect } from "react-redux";
import "./Modal.css";
import { withRouter } from "react-router-dom";

import Login from "./Login";
import Profile from "./Profile";
import ContactForm from "./ContactForm";
import { closeModal } from "../../actions/profile";

export function Modal(props) {
  let display;
  if (props.isVisible && window.innerWidth > 600) {
    display = "flex";
  }

  let contents = <Profile />;

  if (props.isLogin) {
    contents = <Login history={props.history} />;
  }

  if (props.isContactForm) {
    contents = <ContactForm focusedUser={props.focusedUser} />;
  }

  return (
    <div
      style={{ display: display }}
      className="modal-background"
      hidden={!props.isVisible}
    >
      <div className="modal-border" hidden={!props.isVisible}>
        {contents}
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
  focusedUser: state.profile.focusedUser
});

// export default connect(mapStateToProps)(Modal);
export default connect(mapStateToProps)(withRouter(Modal));
