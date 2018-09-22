import { TOGGLE_NAV_MENU, OPEN_NAV_MENU, CLOSE_NAV_MENU } from "../actions/nav";

const initialState = {
  menuIsOpen: false
};

export default function reducer(state = initialState, action) {
  if (action.type === TOGGLE_NAV_MENU) {
    return Object.assign({}, state, {
      menuIsOpen: !state.menuIsOpen
    });
  } else if (action.type === OPEN_NAV_MENU) {
    return Object.assign({}, state, {
      menuIsOpen: true
    });
  } else if (action.type === CLOSE_NAV_MENU) {
    return Object.assign({}, state, {
      menuIsOpen: false
    });
  }
  return state;
}
