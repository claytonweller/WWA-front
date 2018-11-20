import React from "react";
import { connect } from "react-redux";
import ArtistCard from "./artist/ArtistCard";
import Tear from "../sharedComponents/Tear";
import { setFocusedUser } from "../../actions/profile";

export function SearchResults(props) {
  // This controls what happens when users click on an artist Tear
  const tearClick = e => {
    let artistWrapper = e.target.parentElement.parentElement;
    let artistCard = artistWrapper.children[1];

    // If an aritis it clicked it will become active
    if (artistWrapper.className === "artist inactive") {
      artistWrapper.className = "artist active";
      artistCard.style.display = "flex";

      // If clicked again in an active state it will become inactive
    } else if (artistWrapper.className === "artist active") {
      artistWrapper.className = "artist inactive";
      artistCard.style.display = "none";

      // If expanded it will contract to inactive
    } else if (artistWrapper.className === "artist") {
      artistWrapper.className = "artist active";
      let artistId = artistWrapper.id.replace("artist", "");
      unhideMoreButton(artistId);
      artistWrapper.style.order = 2;
    }
  };

  const unhideMoreButton = id => {
    let button = document.getElementById("more" + id);
    button.style.display = "block";
  };

  // If the more info button is clicked an active card will be expanded
  // This sill also make the currently expanded card become inactve
  const moreInfo = (e, id) => {
    let artistWrapper = document.getElementById("artist" + id);
    artistWrapper.style.order = 1;
    artistWrapper.className = "artist";
    e.target.style.display = "none";
    props.dispatch(setFocusedUser(id));
    if (window.innerWidth < 500) {
      window.scroll({ top: 360, behavior: "smooth" });
    } else {
      window.scroll({ top: 0, behavior: "smooth" });
    }
  };

  // These filter all the responses
  // TODO when I add pagenation I'll have to put this logic on the back end
  let experienceFilteredArtists = [];

  let minExperience = 0;
  if (props.experienceFilter === "2+ years") {
    minExperience = 2;
  } else if (props.experienceFilter === "5+ years") {
    minExperience = 5;
  } else if (props.experienceFilter === "10+ years") {
    minExperience = 10;
  }

  experienceFilteredArtists = props.artists.filter(artist => {
    let disciplines = artist.disciplines;
    let disciplineInQuestion = disciplines.find(
      discipline => discipline.type === props.disciplineFilter
    );
    if (disciplineInQuestion) {
      return (
        new Date().getFullYear() - disciplineInQuestion.experience >=
        minExperience
      );
    }
    return true;
  });

  let desiredReward = null;

  if (props.rewardFilter && props.rewardFilter !== "Reward (any)") {
    desiredReward = props.rewardFilter;
  }

  let rewardFilteredArtists = experienceFilteredArtists.filter(artist => {
    let disciplines = artist.disciplines;
    let disciplineInQuestion = disciplines.find(
      discipline => discipline.type === props.disciplineFilter
    );
    if (disciplineInQuestion && desiredReward) {
      return disciplineInQuestion.reward === desiredReward;
    }
    return true;
  });

  let artists = rewardFilteredArtists.map(artist => {
    let status;
    let style = "artist";
    let order = 1;
    if (artist.user_id !== props.focusedUser) {
      status = "inactive";
      style = "artist inactive";
      order = 2;
    }
    return (
      <div
        id={"artist" + artist.user_id}
        key={artist.user_id}
        className={style}
        style={{ order: order }}
      >
        <Tear
          id={artist.user_id}
          key={"tear" + artist.user_id}
          name={artist.first_name + " " + artist.last_name}
          imageUrl={artist.img_url}
          clickAction={e => tearClick(e)}
        />
        <ArtistCard
          moreInfo={moreInfo}
          status={status}
          key={"card" + artist.user_id}
          artist={artist}
        />
      </div>
    );
  });

  // IF there are no artists we see some feedback
  let displayedinfo = (
    <h2 style={{ textAlign: "center", color: "#555555" }}>
      No artists found - try a new search
    </h2>
  );

  // If there are artists for the search they are the display
  if (artists[0]) {
    displayedinfo = artists;
  }

  // What a tiny little return for a bunch of logic!
  return <div className="search-results">{displayedinfo}</div>;
}

const mapStateToProps = state => {
  return {
    artists: state.search.artists,
    rewardFilter: state.search.rewardFilter,
    experienceFilter: state.search.experienceFilter,
    disciplineFilter: state.search.disciplineFilter,
    focusedUser: state.profile.focusedUser
  };
};

export default connect(mapStateToProps)(SearchResults);
