import React from "react";
import { connect } from "react-redux";
import SingleDiscipline from "./SingleDiscipline";
import AddDisciplineForm from "./AddDisciplineForm";

import {
  openModalPage,
  submitProfileForm,
  openAddDisciplineForm
} from "../../../actions/profile";

export class Disciplines extends React.Component {
  addClick(e) {
    e.preventDefault();
    this.props.dispatch(openAddDisciplineForm());
  }

  nextClick() {
    this.props.dispatch(openModalPage("display"));
  }

  disciplineSubmit(values) {
    this.props.dispatch(submitProfileForm("discipline", values));
    this.setState({ formIshidden: true });
  }

  cancelClick(e) {
    e.preventDefault();
    this.setState({ formIshidden: true });
  }

  render() {
    // TODO Success/Error

    // let successMessage;
    // if (this.props.submitSucceeded) {
    //   successMessage = (
    //     <div className="message message-success">
    //       Message submitted successfully
    //     </div>
    //   );
    // }

    // let errorMessage;
    // if (this.props.error) {
    //   errorMessage = (
    //     <div className="message message-error">{this.props.error}</div>
    //   );
    // }

    let disciplineElements = this.props.disciplines.map((discipline, i) => {
      return (
        <SingleDiscipline
          key={"discipline" + i}
          index={i}
          discipline={discipline.type}
          experience={discipline.experience}
          active={discipline.active}
          reward={discipline.reward}
        />
      );
    });

    let listDisplay = "inline-block";
    if (!this.props.formIshidden) {
      listDisplay = "none";
    }

    return (
      <div className="">
        <p className="form-description">
          Add as many artistic disciplines as you like. These are how people
          find artists in our app, the more you add, the more searches you’ll
          show up in. You can update these at any time.
        </p>
        <hr />
        <div className="modal-container">
          {/* The list and the form toggle back and forth */}
          <div className="disciplines-card" style={{ display: listDisplay }}>
            <h3 className="disciplines-title">Your Disciplines</h3>
            {disciplineElements}
            <button onClick={e => this.addClick(e)}>Add</button>
          </div>

          <AddDisciplineForm formIshidden={this.props.formIshidden} />
        </div>
        <hr
          style={{
            marginBottom: "55px"
          }}
        />

        <button
          style={{
            width: "150px",
            position: "absolute",
            right: "20px",
            bottom: "20px",
            display: listDisplay
          }}
          onClick={() => this.nextClick()}
        >
          Next
        </button>
      </div>
    );
  }
}

Disciplines.defaultProps = {
  formIshidden: true,
  disciplines: [],
  disciplineTypes: []
};

const mapStateToProps = state => {
  return {
    formIshidden: state.profile.addDisciplineFormIsHidden,
    disciplines: state.profile.disciplines,
    disciplineTypes: state.profile.disciplineTypes
  };
};

export default connect(mapStateToProps)(Disciplines);
