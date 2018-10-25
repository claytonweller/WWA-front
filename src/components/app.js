import "./App.css";
import React from "react";
import { connect, Provider } from "react-redux";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";

import { refreshAuthToken } from "../actions/auth";
import store from "../store";

import NavBar from "./NavBar";
import SearchPage from "./SearchPage";
import LandingPage from "./LandingPage";
import Modal from "./Modal";

export class App extends React.Component {
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
      <Router>
        <Provider store={store}>
          <div className="app">
            <NavBar />
            <Modal isVisible={this.props.modalIsVisible} />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/search" component={SearchPage} />
          </div>
        </Provider>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
