import React from "react";
import { connect } from "react-redux";
import ArtistCard from "./artist/ArtistCard";
import Tear from "../sharedComponents/Tear";

export function SearchResults(props) {
  const tearClick = e => {
    let artistWrapper = e.target.parentElement.parentElement.parentElement;
    let artistCard = artistWrapper.children[1];
    if (artistWrapper.className === "artist inactive") {
      artistWrapper.className = "artist active";
      artistCard.style.display = "flex";
    } else if (artistWrapper.className === "artist active") {
      artistWrapper.className = "artist inactive";
      artistCard.style.display = "none";
    } else if (artistWrapper.className === "artist") {
      artistWrapper.className = "artist active";
      let artistId = artistWrapper.id.replace("artist", "");
      let button = document.getElementById("more" + artistId);
      button.style.display = "block";
      artistWrapper.style.order = 2;
    }
  };

  const moreInfo = e => {
    let id = e.target.id.replace("more", "");
    let artistWrapper = document.getElementById("artist" + id);
    artistWrapper.style.order = 1;
    artistWrapper.className = "artist";
    e.target.style.display = "none";
    if (window.innerWidth < 500) {
      window.scroll({ top: 360, behavior: "smooth" });
    } else {
      window.scroll({ top: 0, behavior: "smooth" });
    }
  };

  let minExperience = 0;
  if (props.experienceFilter === "2+ years") {
    minExperience = 2;
  } else if (props.experienceFilter === "5+ years") {
    minExperience = 5;
  } else if (props.experienceFilter === "10+ years") {
    minExperience = 10;
  }

  let filteredArtists = [];

  if (props.experienceFilter || props.rewardFilter) {
    filteredArtists = props.artists.filter(artist => {
      let disciplines = artist.disciplines;
      let disciplineInQuestion = disciplines.find(
        discipline => discipline.type === "Magician"
      );
      if (disciplineInQuestion) {
        return (
          new Date().getFullYear() - disciplineInQuestion.experience >=
          minExperience
        );
      }
    });
  }

  let artists = filteredArtists.map(artist => {
    // TODO parent click fix
    return (
      <div
        id={"artist" + artist.user_id}
        key={artist.user_id}
        className="artist inactive"
      >
        <Tear
          id={artist.user_id}
          key={"tear" + artist.user_id}
          name={artist.first_name + " " + artist.last_name}
          imageUrl={artist.img_url}
          clickAction={e => tearClick(e)}
        />
        <ArtistCard
          id={artist.user_id}
          moreInfo={moreInfo}
          status="inactive"
          key={"card" + artist.user_id}
          artist={artist}
        />
      </div>
    );
  });

  return <div className="search-results">{artists}</div>;
}

const mapStateToProps = state => {
  return {
    artists: state.search.artists,
    rewardFilter: state.search.rewardFilter,
    experienceFilter: state.search.experienceFilter
  };
};

export default connect(mapStateToProps)(SearchResults);
