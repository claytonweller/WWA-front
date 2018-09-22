import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./SearchPage.css";

import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";

export class SearchPage extends React.Component {
  render() {
    return (
      <div className="search-page">
        <SearchForm />
        <SearchResults />
      </div>
    );
  }
}

const mapStateToProps = state => ({ state });

export default withRouter(connect(mapStateToProps)(SearchPage));
