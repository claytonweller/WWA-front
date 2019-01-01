import { API_BASE_URL } from "../config";
import { SubmissionError } from "redux-form";
import { login, refreshAuthToken } from "./auth";
import jwtDecode from "jwt-decode";
import { reset } from "redux-form";
import { updateCurrentUser } from "./auth";

////// This page deals with all the calls that heppen within the modal ////////////
// TODO: Rename from 'profile' to 'modal'

// This opens the modal and makes sure the correct
// info is populated
export const OPEN_MODAL_PAGE = "OPEN_MODAL_PAGE";
export const openModalPage = editPage => {
  return {
    type: OPEN_MODAL_PAGE,
    editPage
  };
};

export const CLOSE_MODAL = "CLOSE_MODAL";
export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

// This is used to for a couple of things
// It makes sure emails are sent to the right person
// It also makes it so there's only one expanded Profile at a time
export const SET_FOCUSED_USER = "SET_FOCUSED_USER";
export const setFocusedUser = id => {
  return {
    type: SET_FOCUSED_USER,
    id
  };
};

export const MODAL_POST_REQUEST = "MODAL_POST_REQUEST";
export const modalPostRequest = () => {
  return {
    type: MODAL_POST_REQUEST
  };
};

export const MODAL_POST_SUCCESS = "MODAL_POST_SUCCESS";
export const modalPostSuccess = () => {
  return {
    type: MODAL_POST_SUCCESS
  };
};

export const MODAL_POST_ERROR = "MODAL_POST_ERROR";
export const modalPostError = () => {
  return {
    type: MODAL_POST_ERROR
  };
};

export const IMAGE_POST_REQUEST = "IMAGE_POST_REQUEST";
export const imagePostRequest = () => {
  return {
    type: IMAGE_POST_REQUEST
  };
};

export const IMAGE_POST_SUCCESS = "IMAGE_POST_SUCCESS";
export const imagePostSuccess = () => {
  return {
    type: IMAGE_POST_SUCCESS
  };
};

export const IMAGE_POST_ERROR = "IMAGE_POST_ERROR";
export const imagePostError = () => {
  return {
    type: IMAGE_POST_ERROR
  };
};

////////////// CONTACT //////////////

export const openContactModal = () => dispatch => {
  dispatch(openModalPage("contact"));
};

export const sendMessage = messageObject => dispatch => {
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
      if (successObject.code === 422) {
        return Promise.reject(successObject);
      }
      dispatch(closeModal());
      dispatch(reset("contact"));
    })
    .catch(err => {
      const message = err.message;
      dispatch(modalPostError(message));
      return Promise.reject(
        new SubmissionError({
          _error: message
        })
      );
    });
};

///////////// USER_DISCIPLINES //////////////

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

export const deleteDiscipline = (discipline_id, index) => dispatch => {
  let jwt = localStorage.getItem("authToken");
  let user = jwtDecode(jwt).user;
  return fetch(
    `${API_BASE_URL}/user_disciplines/${user.user_id}/${discipline_id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }
  )
    .then(res => res.json())
    .then(() => {
      dispatch(trashDiscipline(parseInt(index)));
      dispatch(getUserDisciplines());
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

export const STORE_USER_DISCIPLINES = "STORE_USER_DISCIPLINES";
export const storUserDisciplines = disciplines => {
  return {
    type: STORE_USER_DISCIPLINES,
    disciplines
  };
};

export const getUserDisciplines = () => dispatch => {
  let jwt = localStorage.getItem("authToken");
  let user = jwtDecode(jwt).user;

  return fetch(`${API_BASE_URL}/user_disciplines/${user.user_id}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + jwt
    }
  })
    .then(res => res.json())
    .then(disciplines => {
      disciplines.sort((a, b) => a.type.localeCompare(b.type));
      return dispatch(storUserDisciplines(disciplines));
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

export const createNewUserDiscipline = disciplineObject => dispatch => {
  disciplineObject.new_type = disciplineObject.type = disciplineObject.new_type.toLowerCase();
  return fetch(`${API_BASE_URL}/disciplines/`, {
    method: "Post",
    body: JSON.stringify(disciplineObject),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`
    }
  })
    .then(res => res.json())
    .then(successArray => {
      if (successArray.code === 422) {
        return Promise.reject(successArray);
      }
      let resObject = successArray.filter(
        obj => obj.type === disciplineObject.type
      )[0];
      disciplineObject.type_id = resObject.type_id;
      dispatch(postUserDiscipline(disciplineObject));
    })
    .catch(err => {
      const message = err.message;
      dispatch(modalPostError(message));
      return Promise.reject(
        new SubmissionError({
          _error: message
        })
      );
    });
};

export const postUserDiscipline = disciplineObject => (dispatch, getState) => {
  const currentUser = getState().auth.currentUser;
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
      dispatch(modalPostSuccess(successObject));
      dispatch(getUserDisciplines());
      dispatch(closeAddDisciplineForm());
      dispatch(reset("discipline"));
    })
    .catch(err => {
      const message = err.message;
      dispatch(modalPostError(message));
      return Promise.reject(
        new SubmissionError({
          _error: message
        })
      );
    });
};

//////////////// DISCIPLINE TYPES //////////////
// These are used when searching for artists
// They're also used when a user is creating user Disciplines

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
      types.sort((a, b) => a.type.localeCompare(b.type));
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

///////////// USER ////////////

export const updateUserImage = e => (dispatch, getState) => {
  const file = e.target.files[0];

  // Check for file size in MB

  if (file.size / 1024 / 1024 > 0.5) {
    return dispatch(imagePostError());
  }

  let formData = new FormData();
  formData.append("imageFile", file);
  let currentUser = Object.assign({}, getState().auth.currentUser);

  dispatch(imagePostRequest());

  const options = {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`
    }
  };

  fetch(`http://localhost:8080/api/images/`, options)
    .then(res => res.json())
    .then(res => {
      currentUser.img_url = res.img_url;
      dispatch(imagePostSuccess());
      return dispatch(updateCurrentUser(currentUser));
    })
    .catch(() => dispatch(imagePostError()));
};

export const postUser = userObject => dispatch => {
  dispatch(modalPostRequest());
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
        return Promise.reject(
          new SubmissionError({
            _error: successObject.message
          })
        );
      }
      dispatch(modalPostSuccess(successObject));
      dispatch(openModalPage("disciplines"));
      dispatch(login(userObject.email, userObject.password, true));
      dispatch(reset("basic"));
    })
    .catch(err => {
      const message = err.errors._error;
      dispatch(modalPostError(message));
      return Promise.reject(
        new SubmissionError({
          _error: message
        })
      );
    });
};

export const updateUser = (updateObject, nextPage) => (dispatch, getState) => {
  dispatch(modalPostRequest());
  const currentUser = getState().auth.currentUser;
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
      if (successObject.code === 422) {
        return Promise.reject(
          new SubmissionError({
            _error: successObject.message
          })
        );
      }

      dispatch(modalPostSuccess(successObject));
      dispatch(refreshAuthToken());
      if (nextPage) {
        dispatch(openModalPage(nextPage));
      } else {
        dispatch(closeModal());
      }
    })
    .catch(err => {
      console.log(err);
      const message = err.errors._error;
      dispatch(modalPostError(message));
      return Promise.reject(
        new SubmissionError({
          _error: message
        })
      );
    });
};
