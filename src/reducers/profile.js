import { OPEN_MODAL_PAGE, SUBMIT_BASIC_INFO } from "../actions/profile";

const initialState = {
  modalIsVisible: false,
  editPage: "basic",
  basicInfo: {}
};

export default function reducer(state = initialState, action) {
  if (action.type === OPEN_MODAL_PAGE) {
    return Object.assign({}, state, {
      modalIsVisible: true,
      editPage: action.editPage
    });
  } else if (action.type === SUBMIT_BASIC_INFO) {
    return Object.assign({}, state, {
      basicInfo: action.basicInfo
    });
  }
  return state;
}
