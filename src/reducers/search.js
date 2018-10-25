import {
  ACTIVATE_CARD,
  EXPAND_CARD,
  ARTIST_SEARCH_REQUEST,
  ARTIST_SEARCH_SUCCESS,
  ARTIST_SEARCH_ERROR,
  UPDATE_EXPERIENCE_FILTER,
  UPDATE_REWARD_FILTER
} from "../actions/search";

// PLACEHOLDER DATA
import sampleArtists from "../sampleArtists";

const initialState = {
  artists: [],
  loading: false,
  error: null,
  experienceFilter: null,
  rewardFilter: null
};

export default function reducer(state = initialState, action) {
  if (action.type === ACTIVATE_CARD) {
    return Object.assign({}, state, {
      menuIsOpen: !state.menuIsOpen
    });
  } else if (action.type === EXPAND_CARD) {
    return Object.assign({}, state, {
      menuIsOpen: true
    });
  } else if (action.type === ARTIST_SEARCH_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === ARTIST_SEARCH_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      artists: action.artistArray
    });
  } else if (action.type === ARTIST_SEARCH_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === UPDATE_EXPERIENCE_FILTER) {
    return Object.assign({}, state, {
      experienceFilter: action.value
    });
  } else if (action.type === UPDATE_REWARD_FILTER) {
    return Object.assign({}, state, {
      experienceFilter: action.value
    });
  }

  return state;
}
