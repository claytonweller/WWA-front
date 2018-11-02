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
        <SearchForm
          disciplineTypes={this.props.disciplineTypes.map(
            entry => entry.type.charAt(0).toUpperCase() + entry.type.slice(1)
          )}
        />
        <SearchResults />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    disciplineTypes: state.profile.disciplineTypes
  };
};

export default withRouter(connect(mapStateToProps)(SearchPage));
