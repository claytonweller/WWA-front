import React from "react";
import "./artistCard.css";

import { connect } from "react-redux";

import { Paragraph } from "./Paragraph";
import { NameTag } from "./NameTag";
import BasicInfo from "./BasicInfo";
import { DisciplineGrid } from "./DisciplineGrid";
import { CloseX } from "../../sharedComponents/CloseX";

/*
Artists have 3 states they can be in.
  1. Inactive - Which only shows their image/tear
  2. active which is when they are clicked the first time.
    This shows just the desired projects, name, and a 'more' button
  3. Expanded This has all the user info, as well as a contact button 

These are populated in the 'searchResults.js' an map a call from the server
*/
export class ArtistCard extends React.Component {
  render() {
    let buttonDisplay = "none";
    let display;
    if (this.props.status === "inactive") {
      display = "none";
      buttonDisplay = "block";
    }

    // When the close-x is clicked this closes the expanded user
    const closeAction = () => {
      const id = this.props.artist.user_id;
      const artistWrapper = document.getElementById("artist" + id);
      const artistCard = artistWrapper.children[1];
      let button = document.getElementById("more" + id);
      artistWrapper.className = "artist inactive";
      artistCard.style.display = "none";
      artistWrapper.style.order = 2;
      button.style.display = "block";
    };

    return (
      <div className="artist-card" style={{ display: display }}>
        <div className="card-left">
          <div className="active-card">
            <NameTag
              name={
                this.props.artist.first_name + " " + this.props.artist.last_name
              }
            />
            <Paragraph content={this.props.artist.desired_projects} />
            <button
              style={{ display: buttonDisplay }}
              id={"more" + this.props.artist.user_id}
              onClick={e => this.props.moreInfo(e, this.props.artist.user_id)}
            >
              More
            </button>
          </div>
          {/* Below is only visible when the focusedId (set by the state) matches the artist card */}
          <div className="expanded-card">
            <BasicInfo
              location={this.props.artist.city + ", " + this.props.artist.state}
              DOB={this.props.artist.dob}
              userId={this.props.artist.user_id}
            />
            <DisciplineGrid disciplines={this.props.artist.disciplines} />
          </div>
        </div>
        <div className="vertical-bar expanded-card" />
        <div className="card-right expanded-card">
          <CloseX className="artist-x" action={closeAction} />
          <Paragraph title="Bio" content={this.props.artist.bio} />
          <Paragraph
            title="Equipment - Supplies"
            content={this.props.artist.equipment}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(ArtistCard);
