import React from "react";

// This only shows up in the expanded version
export function DisciplineGrid(props) {
  let disciplines = props.disciplines.map((discipline, i) => {
    let years = new Date().getFullYear() - discipline.experience;
    let reward = string => {
      if (string === "For Pay") {
        return "Financial";
      } else if (string === "For Fun") {
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
          {capitalizeString(discipline.type)}
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

export default DisciplineGrid;
