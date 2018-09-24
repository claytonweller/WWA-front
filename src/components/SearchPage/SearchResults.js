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

  let artists = props.artists.map(artist => {
    return (
      <div
        id={"artist" + artist.id}
        key={artist.id}
        className="artist inactive"
      >
        <Tear
          id={artist.id}
          clickAction={e => tearClick(e)}
          key={"tear" + artist.id}
          name={artist.firstName + " " + artist.lastName}
          imageUrl={artist.imageUrl}
        />
        <ArtistCard
          id={artist.id}
          moreInfo={moreInfo}
          status="inactive"
          key={"card" + artist.id}
          artist={artist}
        />
      </div>
    );
  });

  return <div className="search-results">{artists}</div>;
}

const mapStateToProps = state => {
  return {
    artists: state.search.artists
  };
};

export default connect(mapStateToProps)(SearchResults);
