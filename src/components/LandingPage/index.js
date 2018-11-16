import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AboveFold from "./AboveFold";
import FindArtists from "./FindArists";
import BeFound from "./BeFound";

export class LandingPage extends React.Component {
  render() {
    return (
      <div
        style={{
          maxWidth: "1000px",
          top: "75px",
          position: "absolute",
          width: "100%",
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <AboveFold />
        <FindArtists />
        <BeFound />
      </div>
    );
  }
}

const mapStateToProps = state => ({ state });

export default withRouter(connect(mapStateToProps)(LandingPage));
