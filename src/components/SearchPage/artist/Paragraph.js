import React from "react";
import { connect } from "react-redux";

export function Paragraph(props) {
  let display;
  if (!props.title) {
    display = "none";
  }

  return (
    <div className="paragraph">
      <h2 style={{ display: display }}>{props.title}</h2>
      <p>{props.content}</p>
    </div>
  );
}

const mapStateToProps = state => ({
  // loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Paragraph);
