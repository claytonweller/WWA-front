import React from "react";
import { connect } from "react-redux";
import trashIcon from "../../assets/images/Trash.png";
import editIcon from "../../assets/images/Edit.png";

export function ProgressTear(props) {
  return (
    <div className="single-discipline">
      <div className="discipline-top">
        <a href="NONE">Set designer</a>
        <div>
          <a href="NONE">
            <img src={trashIcon} alt="Trash this thing" />
          </a>
          <a href="NONE">
            <img src={editIcon} alt="Edit this thing" />
          </a>
        </div>
      </div>
      <div className="discipline-bottom">
        <div>
          <span>Exp- </span> 3yrs
        </div>
        <div className="spacer" />
        <div>
          <span>Reward- </span> Pay
        </div>
        <div className="spacer" />
        <div>
          <span>Active- </span> No
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  // editPage: state.editPage
});

export default connect(mapStateToProps)(ProgressTear);
