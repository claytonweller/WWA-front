import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export class LandingPage extends React.Component {
  render() {
    return (
      <div style={{ top: "75px", position: "absolute" }}>
        <h1>Amazing landing Page</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({ state });

export default withRouter(connect(mapStateToProps)(LandingPage));
