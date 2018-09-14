import React from "react";
import { connect } from "react-redux";

export function DisciplineGrid(props) {
  let disciplines = props.disciplines.map((discipline, i) => {
    let years = discipline.startYear - new Date().getFullYear();
    let reward = string => {
      if (string === "pay") {
        return "Financial";
      } else if (string === "fun") {
        return "Fun/Experience";
      } else {
        return "Depends";
      }
    };

    let capitalizeString = string => {
      return string.replace(/^\w/, c => c.toUpperCase());
    };
    return (
      <div key={"discipline" + i}>
        <span>{capitalizeString(discipline.name)}</span>
        <span>{years + " yr"}</span>
        <span>{capitalizeString(discipline.active)}</span>
        <span>{reward(discipline.reward)}</span>
      </div>
    );
  });

  return (
    <div>
      <div className="disciplines-top">
        <h2>Disciplines</h2>
        <div>Experience</div>
        <div>Seeking Work</div>
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
