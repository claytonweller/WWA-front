import {
  OPEN_MODAL_PAGE,
  SUBMIT_PROFILE_FORM,
  CLOSE_MODAL,
  OPEN_ADD_DISCIPLINE_FORM,
  CLOSE_ADD_DISCIPLINE_FORM,
  TRASH_DISCIPLINE,
  MODAL_POST_REQUEST,
  MODAL_POST_SUCCESS,
  MODAL_POST_ERROR,
  STORE_DISCIPLINE_TYPES,
  STORE_USER_DISCIPLINES,
  SET_FOCUSED_USER
} from "../actions/profile";

const initialState = {
  modalIsVisible: false,
  addDisciplineFormIsHidden: true,
  disciplineTypes: [],
  editPage: "basic",
  basicInfo: { complete: false, values: {} },
  disciplines: [],
  display: { complete: false, values: {} },
  bio: { complete: false, values: {} },
  isLogin: false,
  isContactForm: false,
  loading: false,
  error: null,
  focusedUser: null
};

export default function reducer(state = initialState, action) {
  if (action.type === OPEN_MODAL_PAGE) {
    if (action.editPage === "login") {
      return Object.assign({}, state, {
        modalIsVisible: true,
        isLogin: true
      });
    }
    if (action.editPage === "contact") {
      return Object.assign({}, state, {
        modalIsVisible: true,
        isContactForm: true
      });
    }
    return Object.assign({}, state, {
      modalIsVisible: true,
      editPage: action.editPage,
      isLogin: false,
      isContactForm: false
    });
  } else if (action.type === CLOSE_MODAL) {
    return Object.assign({}, state, {
      modalIsVisible: false,
      isLogin: false,
      isContactForm: false
    });
  } else if (action.type === SET_FOCUSED_USER) {
    return Object.assign({}, state, {
      modalIsVisible: false,
      focusedUser: parseInt(action.id, 10)
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
  } else if (action.type === STORE_DISCIPLINE_TYPES) {
    return Object.assign({}, state, {
      disciplineTypes: action.disciplineTypes
    });
  } else if (action.type === STORE_USER_DISCIPLINES) {
    return Object.assign({}, state, {
      disciplines: action.disciplines
    });
  } else if (action.type === MODAL_POST_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === MODAL_POST_SUCCESS) {
    return Object.assign({}, state, {
      loading: false
    });
  } else if (action.type === MODAL_POST_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  return state;
}
