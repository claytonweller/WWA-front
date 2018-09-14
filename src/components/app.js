import React from "react";
import { connect, Provider } from "react-redux";
import { withRouter } from "react-router-dom";

import { refreshAuthToken } from "../actions/auth";
import store from "../store";

import SearchForm from "./SearchForm";
import { SearchResults } from "./SearchResults";
import { Nav } from "./Nav";

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
      <div className="app">
        <Nav />
        <Provider store={store}>
          <SearchForm />
        </Provider>
        <SearchResults />
        {/* <Route exact path="/" component={Landing} />
        <Route exact path="/search" component={Search} /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
