import React from "react";
import { connect } from "react-redux";
import trashIcon from "../../assets/images/Trash.png";
import editIcon from "../../assets/images/Edit.png";
import { trashDiscipline, editDiscipline } from "../../actions/profile";

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

  const editClick = e => {
    e.preventDefault();
    let index = e.target.id.replace("editDTitle", "");
    index = index.replace("editD", "");
    index = parseInt(index);
    props.dispatch(editDiscipline(index));
    document.getElementById("editDiscipline").value =
      props.disciplines[index].editDiscipline;
    document.getElementById("editReward").value =
      props.disciplines[index].editReward;
    document.getElementById("editActive").value =
      props.disciplines[index].editActive;
    document.getElementById("editExperience").value =
      props.disciplines[index].editExperience;
  };

  const trashClick = e => {
    e.preventDefault();
    let index = e.target.id.replace("trashD", "");
    props.dispatch(trashDiscipline(parseInt(index)));
  };

  return (
    <div className="single-discipline">
      <div className="discipline-top">
        <a
          id={"editDTitle" + props.index}
          onClick={e => editClick(e)}
          href="NONE"
        >
          {props.discipline}
        </a>
        <div>
          <a onClick={e => trashClick(e)} href="NONE">
            <img
              id={"trashD" + props.index}
              src={trashIcon}
              alt={"trash " + props.discipline}
            />
          </a>
          <a onClick={e => editClick(e)} href="NONE">
            <img
              id={"editD" + props.index}
              src={editIcon}
              alt={"edit " + props.discipline}
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
