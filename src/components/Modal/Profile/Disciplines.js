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
    console.log(this.props);
  }

  nextClick(values) {
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
    let successMessage;
    if (this.props.submitSucceeded) {
      successMessage = (
        <div className="message message-success">
          Message submitted successfully
        </div>
      );
    }

    let errorMessage;
    if (this.props.error) {
      errorMessage = (
        <div className="message message-error">{this.props.error}</div>
      );
    }

    let disciplineElements = this.props.disciplines.map((discipline, i) => {
      return (
        <SingleDiscipline
          key={"discipline" + i}
          index={i}
          discipline={discipline.editDiscipline}
          experience={discipline.editExperience}
          active={discipline.editActive}
          reward={discipline.editReward}
        />
      );
    });

    return (
      <div className="">
        <p className="form-description">
          Add as many artistic disciplines as you like. These are how people
          find artists in our app, the more you add, the more searches you’ll
          show up in. You can update these at any time.
        </p>
        <hr />
        <div className="modal-container">
          <div className="disciplines-card modal-left">
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
            bottom: "20px"
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
  disciplines: []
};

const mapStateToProps = state => {
  // console.log(state.profile.disciplines);
  return {
    formIshidden: state.profile.addDisciplineFormIsHidden,
    disciplines: state.profile.disciplines
  };
};

export default connect(mapStateToProps)(Disciplines);
