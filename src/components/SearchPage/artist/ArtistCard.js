import React from "react";
import "./artistCard.css";

import { connect } from "react-redux";

import { Paragraph } from "./Paragraph";
import { NameTag } from "./NameTag";
//for whatever reason this is not recieving props
// import { BasicInfo } from "./BasicInfo";
import { DisciplineGrid } from "./DisciplineGrid";

import { openContactModal } from "../../../actions/profile";

export class ArtistCard extends React.Component {
  moreInfoClick(e) {
    this.props.moreInfo(e);
  }

  // These two funciton wuold live in the basic Info Section
  findAge = DOB => {
    let now = new Date();
    let difference = (now - DOB) / 1000 / 60 / 60 / 24 / 365.25;
    return Math.floor(difference);
  };

  contactClick = e => {
    this.props.dispatch(openContactModal(e.target.id.replace("contact", "")));
  };

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
              id={"more" + this.props.id}
              onClick={e => this.moreInfoClick(e)}
            >
              More
            </button>
          </div>
          <div className="expanded-card">
            {/* <BasicInfo
              location={this.props.artist.city + ", " + this.props.artist.state}
              DOB={this.props.artist.dob}
            /> */}
            <div className="basic-info">
              <div>Age {this.findAge(this.props.artist.dob)}</div>
              <div>
                {" "}
                {this.props.artist.city + ", " + this.props.artist.state}
              </div>
              <button
                id={`contact${this.props.id}`}
                onClick={e => this.contactClick(e)}
              >
                Contact
              </button>
            </div>
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
