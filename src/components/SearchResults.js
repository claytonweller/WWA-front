import React from "react";
import { connect } from "react-redux";
import { ArtistCard } from "./artist/ArtistCard";
import sampleArtists from "../sampleArtists";

export function SearchResults(props) {
  let artists = sampleArtists.map(artist => {
    return <ArtistCard key={artist.id} artist={artist} />;
  });

  return (
    <div>
      <h2>RESULTS</h2>
      {artists}
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(SearchResults);
