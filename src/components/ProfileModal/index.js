import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export class ProfileModal extends React.Component {
  render() {
    return (
      <div>
        <h3>Profile Modal</h3>
      </div>
    );
  }
}

const mapStateToProps = state => ({ state });

export default withRouter(connect(mapStateToProps)(ProfileModal));
