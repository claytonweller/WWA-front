import React from "react";
import { connect } from "react-redux";
import trashIcon from "../../../assets/images/Trash.png";
import { deleteDiscipline, trashDiscipline } from "../../../actions/profile";

// These are populated in the discipline page.
export function SingleDiscipline(props) {
  const experienceInYears = startYear => {
    let now = new Date();
    let dateInYears = now / 1000 / 60 / 60 / 24 / 365.25 + 1970;
    let difference = dateInYears - startYear;
    return Math.floor(difference);
  };

  let reward = "Depends";
  if (props.reward) {
    reward = props.reward;
  }

  let active = "No";
  if (props.active) {
    active = props.active;
  }

  let experience = 1;
  if (props.experience) {
    experience = experienceInYears(props.experience);
  }

  const trashClick = e => {
    e.preventDefault();
    let index = e.target.id.replace("trashD", "");
    let disciplineId = props.disciplines[index].u_discipline_id;
    props.dispatch(deleteDiscipline(disciplineId));
    props.dispatch(trashDiscipline(index));
  };

  return (
    <div className="single-discipline">
      <div className="discipline-top">
        <h2 style={{ margin: "0px", marginTop: "5px" }}>{props.discipline}</h2>
        <div>
          <a onClick={e => trashClick(e)} href="NONE">
            <img
              id={"trashD" + props.index}
              src={trashIcon}
              alt={"trash " + props.discipline}
            />
          </a>
        </div>
      </div>
      <div className="discipline-bottom">
        <div>
          <span>Exp- </span> {experience}
          yrs
        </div>
        <div className="spacer" />
        <div>
          <span>Reward- </span> {reward}
        </div>
        <div className="spacer" />
        <div>
          <span>Active- </span> {active}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  disciplines: state.profile.disciplines
});

export default connect(mapStateToProps)(SingleDiscipline);
