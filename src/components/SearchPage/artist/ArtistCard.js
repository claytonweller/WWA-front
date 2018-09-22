import React from "react";
import "./artistCard.css";

import { connect } from "react-redux";

import { Paragraph } from "./Paragraph";
import { NameTag } from "./NameTag";
import { BasicInfo } from "./BasicInfo";
import { DisciplineGrid } from "./DisciplineGrid";

export class ArtistCard extends React.Component {
  moreInfoClick(e) {
    this.props.moreInfo(e);
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
                this.props.artist.firstName + " " + this.props.artist.lastName
              }
            />
            <Paragraph content={this.props.artist.desiredProjects} />
            <button
              id={"more" + this.props.id}
              onClick={e => this.moreInfoClick(e)}
            >
              More
            </button>
          </div>
          <div className="expanded-card">
            <BasicInfo
              location={this.props.artist.city + ", " + this.props.artist.state}
              DOB={this.props.artist.DOB}
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

export default /*requiresLogin()*/ connect(mapStateToProps)(ArtistCard);
