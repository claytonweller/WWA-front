import { API_BASE_URL } from "../config";
import { SubmissionError } from "redux-form";

// This changes a searched user tear to it's first dipslay info
export const ACTIVATE_CARD = "ACTIVATE_CARD";
export const activateCard = () => ({
  type: ACTIVATE_CARD
});

// This completely fills up a card
export const EXPAND_CARD = "EXPAND_CARD";
export const expandCard = () => ({
  type: EXPAND_CARD
});

// This is from the search form
export const UPDATE_REWARD_FILTER = "UPDATE_REWARD_FILTER";
export const udpateRewardFilter = value => ({
  type: UPDATE_REWARD_FILTER,
  value
});

// Also search form
export const UPDATE_EXPERIENCE_FILTER = "UPDATE_EXPERIENCE_FILTER";
export const updateExperienceFilter = value => ({
  type: UPDATE_EXPERIENCE_FILTER,
  value
});

// Also Search from
export const UPDATE_DISCIPLINE_FILTER = "UPDATE_DISCIPLINE_FILTER";
export const updateDisciplineFilter = value => ({
  type: UPDATE_DISCIPLINE_FILTER,
  value
});

export const ARTIST_SEARCH_REQUEST = "ARTIST_SEARCH_REQUEST";
export const artistSearchRequest = disciplineFilter => ({
  type: ARTIST_SEARCH_REQUEST,
  disciplineFilter
});

export const ARTIST_SEARCH_SUCCESS = "ARTIST_SEARCH_SUCCESS";
export const artistSearchSuccess = artistArray => ({
  type: ARTIST_SEARCH_SUCCESS,
  artistArray
});

export const ARTIST_SEARCH_ERROR = "ARTIST_SEARCH_ERROR";
export const artistSearchError = error => ({
  type: ARTIST_SEARCH_ERROR,
  error
});

export const searchArtists = searchObject => dispatch => {
  dispatch(artistSearchRequest());
  let fetchRoute = "";
  if (searchObject.discipline) {
    fetchRoute = "?type=" + searchObject.discipline.toLowerCase();
    dispatch(updateDisciplineFilter(searchObject.discipline.toLowerCase()));
  }

  return fetch(`${API_BASE_URL}/users/${fetchRoute}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`
    }
  })
    .then(res => res.json())
    .then(artistArray => {
      dispatch(artistSearchSuccess(artistArray));
    })
    .catch(err => {
      const message = err;
      dispatch(artistSearchError(message));
      console.log(err);
      return Promise.reject(
        new SubmissionError({
          _error: message
        })
      );
    });
};
