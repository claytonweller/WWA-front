import { ACTIVATE_CARD, EXPAND_CARD } from "../actions/search";

// PLACEHOLDER DATA
import sampleArtists from "../sampleArtists";

const initialState = {
  artists: sampleArtists
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
  }
  return state;
}
