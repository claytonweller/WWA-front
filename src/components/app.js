import "./App.css";
import React from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";

import { refreshAuthToken } from "../actions/auth";
import { getDisciplineTypes } from "../actions/profile";

import NavBar from "./NavBar";
import SearchPage from "./SearchPage";
import LandingPage from "./LandingPage";
import Modal from "./Modal";
import Footer from "./Footer";

export class App extends React.Component {
  componentWillMount() {
    if (this.props.hasAuthToken) {
      this.props.history.push("/search");
    } else {
      this.props.history.push("/");
    }
  }

  componentDidMount() {
    this.props.dispatch(getDisciplineTypes());
    this.props.dispatch(refreshAuthToken());
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }
    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <div className="app">
        {/* Locked to the top */}
        <NavBar />
        {/* appears on top of the current page */}
        <Modal isVisible={this.props.modalIsVisible} />
        {/* If a user isn't logged in they get this page */}
        <Route exact path="/" component={LandingPage} />
        {/* If a user is logged in they get this page */}
        <Route exact path="/search" component={SearchPage} />
        {/* locked to the bottom */}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
