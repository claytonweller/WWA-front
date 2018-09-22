import React from "react";
import { connect } from "react-redux";

export function DisciplineGrid(props) {
  let disciplines = props.disciplines.map((discipline, i) => {
    let years = new Date().getFullYear() - discipline.startYear;
    let reward = string => {
      if (string === "pay") {
        return "Financial";
      } else if (string === "fun") {
        return "Fun";
      } else {
        return "Depends";
      }
    };

    let capitalizeString = string => {
      return string.replace(/^\w/, c => c.toUpperCase());
    };
    return (
      <div className="card-discipline" key={"discipline" + i}>
        <span className="discipline-title">
          {capitalizeString(discipline.name)}
        </span>
        <span>{years + " yr"}</span>
        <span>{capitalizeString(discipline.active)}</span>
        <span>{reward(discipline.reward)}</span>
      </div>
    );
  });

  return (
    <div className="disciplines-grid">
      <div className="disciplines-top card-discipline">
        <h2>Disciplines</h2>
        <div>Experience</div>
        <div>Active</div>
        <div>Reward</div>
      </div>
      <div className="disciplines-bottom">{disciplines}</div>
    </div>
  );
}

const mapStateToProps = state => ({
  // loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(DisciplineGrid);
