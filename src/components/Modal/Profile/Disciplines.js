import React from "react";
import { connect } from "react-redux";
import { reset } from "redux-form";
import AddDisciplineForm from "./AddDisciplineForm";

import { openModalPage, openAddDisciplineForm } from "../../../actions/profile";
import DisciplineList from "./DisciplineList";

export class Disciplines extends React.Component {
  addClick(e) {
    e.preventDefault();
    this.props.dispatch(reset("discipline"));
    this.props.dispatch(openAddDisciplineForm());
  }

  nextClick() {
    this.props.dispatch(openModalPage("display"));
  }

  disciplineSubmit() {
    this.setState({ formIshidden: true });
  }

  render() {
    let visibleElement = <DisciplineList />;
    let buttonDisplay;
    if (!this.props.formIshidden) {
      visibleElement = <AddDisciplineForm />;
      buttonDisplay = "none";
    }

    return (
      <div>
        <p className="form-description">
          Add as many artistic disciplines as you like. These are how people
          find artists in our app, the more you add, the more searches you’ll
          show up in. You can update these at any time.
        </p>
        <hr />
        <div className="modal-container">
          {/* The list and the form toggle back and forth */}
          {visibleElement}
        </div>
        <hr
          style={{
            marginBottom: "10px"
          }}
        />
        <div style={{ display: buttonDisplay }} className="button-holder">
          <button onClick={() => this.nextClick()}>Next</button>
        </div>
      </div>
    );
  }
}

Disciplines.defaultProps = {
  formIshidden: true,
  disciplines: []
};

const mapStateToProps = state => {
  return {
    formIshidden: state.profile.addDisciplineFormIsHidden
  };
};

export default connect(mapStateToProps)(Disciplines);
