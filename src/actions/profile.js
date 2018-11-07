import { API_BASE_URL } from "../config";
import { SubmissionError } from "redux-form";
import { login } from "./auth";
import { parseJwt } from "../parseJwt";

export const OPEN_MODAL_PAGE = "OPEN_MODAL_PAGE";
export const openModalPage = editPage => {
  return {
    type: OPEN_MODAL_PAGE,
    editPage
  };
};

export const SUBMIT_PROFILE_FORM = "SUBMIT_PROFILE_FORM";
export const submitProfileForm = (form, values) => {
  return {
    type: SUBMIT_PROFILE_FORM,
    form,
    values
  };
};

export const CLOSE_MODAL = "CLOSE_MODAL";
export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

export const SET_FOCUSED_USER = "SET_FOCUSED_USER";
export const setFocusedUser = id => {
  return {
    type: SET_FOCUSED_USER,
    id
  };
};

export const openContactModal = id => dispatch => {
  dispatch(setFocusedUser(id));
  dispatch(openModalPage("contact"));
};

export const sendMessage = messageObject => dispatch => {
  // TODO (Request)
  return fetch(`${API_BASE_URL}/communication/`, {
    method: "POST",
    body: JSON.stringify(messageObject),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(successObject => {
      console.log("success", successObject);
      if (successObject.code === 422) {
        return Promise.reject(successObject);
      }
      // TODO dispatch(postUserSuccess(successObject));
      dispatch(closeModal());
      dispatch(setFocusedUser(null));
    })
    .catch(err => {
      const message = err;
      return Promise.reject(
        new SubmissionError({
          _error: message
        })
      );
    });
};

export const OPEN_ADD_DISCIPLINE_FORM = "OPEN_ADD_DISCIPLINE_FORM";
export const openAddDisciplineForm = () => {
  return {
    type: OPEN_ADD_DISCIPLINE_FORM
  };
};

export const CLOSE_ADD_DISCIPLINE_FORM = "CLOSE_ADD_DISCIPLINE_FORM";
export const closeAddDisciplineForm = () => {
  return {
    type: CLOSE_ADD_DISCIPLINE_FORM
  };
};

export const TRASH_DISCIPLINE = "TRASH_DISCIPLINE";
export const trashDiscipline = index => {
  return {
    type: TRASH_DISCIPLINE,
    index
  };
};

export const EDIT_DISCIPLINE = "EDIT_DISCIPLINE";
export const editDiscipline = index => {
  return {
    type: EDIT_DISCIPLINE,
    index
  };
};

export const STORE_DISCIPLINE_TYPES = "STORE_DISCIPLINE_TYPES";
export const storeDisciplineTypes = disciplineTypes => {
  return {
    type: STORE_DISCIPLINE_TYPES,
    disciplineTypes
  };
};

export const getDisciplineTypes = () => dispatch => {
  return fetch(`${API_BASE_URL}/disciplines/`, {
    method: "GET"
  })
    .then(res => res.json())
    .then(types => {
      dispatch(storeDisciplineTypes(types));
    })
    .catch(err => {
      const message = err;
      return Promise.reject(
        new SubmissionError({
          _error: message
        })
      );
    });
};

export const POST_USER_REQUEST = "POST_USER_REQUEST";
export const postUserRequest = () => {
  return {
    type: POST_USER_REQUEST
  };
};

export const POST_USER_SUCCESS = "POST_USER_SUCCESS";
export const postUserSuccess = () => {
  return {
    type: POST_USER_REQUEST
  };
};

export const POST_USER_ERROR = "POST_USER_ERROR";
export const postUserError = () => {
  return {
    type: POST_USER_REQUEST
  };
};

export const postUser = userObject => dispatch => {
  dispatch(postUserRequest());
  return fetch(`${API_BASE_URL}/users/`, {
    method: "POST",
    body: JSON.stringify(userObject),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(successObject => {
      if (successObject.code === 422) {
        return Promise.reject(successObject);
      }
      dispatch(postUserSuccess(successObject));
      dispatch(openModalPage("disciplines"));
      dispatch(login(userObject.email, userObject.password, true));
    })
    .catch(err => {
      const message = err;
      return Promise.reject(
        new SubmissionError({
          _error: message
        })
      );
    });
};

export const updateUser = (updateObject, nextPage) => dispatch => {
  dispatch(postUserRequest());
  const currentUser = parseJwt(localStorage.getItem("authToken")).user;
  console.log(currentUser);
  return fetch(`${API_BASE_URL}/users/${currentUser.user_id}`, {
    method: "PUT",
    body: JSON.stringify(updateObject),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`
    }
  })
    .then(res => res.json())
    .then(successObject => {
      dispatch(postUserSuccess(successObject));

      if (nextPage) {
        dispatch(openModalPage(nextPage));
      } else {
        dispatch(closeModal());
      }
    })
    .catch(err => {
      const message = err;
      return Promise.reject(
        new SubmissionError({
          _error: message
        })
      );
    });
};

export const postUserDiscipline = disciplineObject => dispatch => {
  const currentUser = parseJwt(localStorage.getItem("authToken")).user;
  disciplineObject.user_id = currentUser.user_id;
  return fetch(`${API_BASE_URL}/user_disciplines/${currentUser.user_id}`, {
    method: "Post",
    body: JSON.stringify(disciplineObject),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`
    }
  })
    .then(res => res.json())
    .then(successObject => {
      console.log("success", successObject);
      dispatch(postUserSuccess(successObject));
    })
    .catch(err => {
      const message = err;
      return Promise.reject(
        new SubmissionError({
          _error: message
        })
      );
    });
};
