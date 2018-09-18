import React from "react";
import { connect } from "react-redux";
import { Tear } from "../../sharedComponents/Tear";
import { Paragraph } from "./Paragraph";
import { NameTag } from "./NameTag";
import { BasicInfo } from "./BasicInfo";
import { DisciplineGrid } from "./DisciplineGrid";

export class ArtistCard extends React.Component {
  render() {
    return (
      <div style={{ border: "solid 1px black" }}>
        <div className="card-left">
          <Tear
            width="20%"
            name={
              this.props.artist.firstName + " " + this.props.artist.lastName
            }
            imageUrl={this.props.artist.imageUrl}
          />

          <NameTag
            name={
              this.props.artist.firstName + " " + this.props.artist.lastName
            }
          />
          <Paragraph content={this.props.artist.desiredProjects} />
          <BasicInfo
            location={this.props.artist.city + ", " + this.props.artist.state}
            DOB={this.props.artist.DOB}
          />
          <DisciplineGrid disciplines={this.props.artist.disciplines} />
        </div>
        <div className="card-right">
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
