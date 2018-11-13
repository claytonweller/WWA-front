import React from "react";
import "./artistCard.css";

import { connect } from "react-redux";

import { Paragraph } from "./Paragraph";
import { NameTag } from "./NameTag";
import BasicInfo from "./BasicInfo";
import { DisciplineGrid } from "./DisciplineGrid";

export class ArtistCard extends React.Component {
  moreInfoClick(e, id) {
    this.props.moreInfo(e, id);
  }

  render() {
    let display;
    if (this.props.status === "inactive") {
      display = "none";
    }
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
              id={"more" + this.props.artist.user_id}
              onClick={e => this.moreInfoClick(e, this.props.artist.user_id)}
            >
              More
            </button>
          </div>
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
