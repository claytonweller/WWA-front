import React from "react";
import { connect } from "react-redux";
import { reset } from "redux-form";
import SingleDiscipline from "./SingleDiscipline";

import { openModalPage, openAddDisciplineForm } from "../../../actions/profile";

export class DisciplinesList extends React.Component {
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

    return (
      <div className="disciplines-card">
        <h3 className="disciplines-title">Your Disciplines</h3>
        {disciplineElements}
        <button onClick={e => this.addClick(e)}>Add</button>
      </div>
    );
  }
}

DisciplinesList.defaultProps = {
  disciplines: []
};

const mapStateToProps = state => {
  return {
    disciplines: state.profile.disciplines
  };
};

export default connect(mapStateToProps)(DisciplinesList);
