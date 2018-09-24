import {
  OPEN_MODAL_PAGE,
  SUBMIT_PROFILE_FORM,
  CLOSE_MODAL,
  OPEN_ADD_DISCIPLINE_FORM,
  CLOSE_ADD_DISCIPLINE_FORM,
  TRASH_DISCIPLINE,
  EDIT_DISCIPLINE
} from "../actions/profile";

const initialState = {
  modalIsVisible: false,
  addDisciplineFormIsHidden: true,
  editPage: "basic",
  basicInfo: { complete: false, values: {} },
  disciplines: [],
  display: { complete: false, values: {} },
  bio: { complete: false, values: {} }
};

export default function reducer(state = initialState, action) {
  if (action.type === OPEN_MODAL_PAGE) {
    return Object.assign({}, state, {
      modalIsVisible: true,
      editPage: action.editPage
    });
  } else if (action.type === CLOSE_MODAL) {
    return Object.assign({}, state, {
      modalIsVisible: false
    });
  } else if (action.type === SUBMIT_PROFILE_FORM) {
    if (action.form === "discipline") {
      return Object.assign({}, state, {
        disciplines: [...state.disciplines, action.values]
      });
    } else {
      return Object.assign({}, state, {
        [action.form]: { values: action.values, complete: true }
      });
    }
  } else if (action.type === OPEN_ADD_DISCIPLINE_FORM) {
    return Object.assign({}, state, {
      addDisciplineFormIsHidden: false
    });
  } else if (action.type === CLOSE_ADD_DISCIPLINE_FORM) {
    return Object.assign({}, state, {
      addDisciplineFormIsHidden: true
    });
  } else if (action.type === TRASH_DISCIPLINE) {
    let newDisciplines = state.disciplines.filter((d, i) => action.index !== i);
    return Object.assign({}, state, {
      disciplines: newDisciplines
    });
  } else if (action.type === EDIT_DISCIPLINE) {
    let newDisciplines = state.disciplines.filter((d, i) => action.index !== i);
    return Object.assign({}, state, {
      addDisciplineFormIsHidden: false,
      disciplines: newDisciplines
    });
  }
  return state;
}
