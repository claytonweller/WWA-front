import jwtDecode from "jwt-decode";
import { SubmissionError, reset } from "redux-form";

import { API_BASE_URL } from "../config";
import { saveAuthToken, clearAuthToken } from "../local-storage";
import { closeModal, getUserDisciplines } from "./profile";
import { artistSearchSuccess } from "./search";

export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const setAuthToken = authToken => ({
  type: SET_AUTH_TOKEN,
  authToken
});

export const CLEAR_AUTH = "CLEAR_AUTH";
export const clearAuth = () => ({
  type: CLEAR_AUTH
});

export const AUTH_REQUEST = "AUTH_REQUEST";
export const authRequest = () => ({
  type: AUTH_REQUEST
});

export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const authSuccess = currentUser => ({
  type: AUTH_SUCCESS,
  currentUser
});

export const AUTH_ERROR = "AUTH_ERROR";
export const authError = error => ({
  type: AUTH_ERROR,
  error
});

export const UPDATE_CURRENT_USER = "UPDATE_CURRENT_USER";
export const updateCurrentUser = updatedUser => ({
  type: UPDATE_CURRENT_USER,
  updatedUser
});

export const resetAllForms = dispatch => {
  dispatch(reset("login"));
  dispatch(reset("basic"));
  dispatch(reset("discipline"));
  dispatch(reset("display"));
  dispatch(reset("bio"));
};

// Stores the auth token in state and localStorage, and decodes and stores
// the user data stored in the token
const storeAuthInfo = (authToken, dispatch) => {
  if (authToken) {
    const decodedToken = jwtDecode(authToken);
    dispatch(setAuthToken(authToken));
    dispatch(authSuccess(decodedToken.user));
    saveAuthToken(authToken);
    dispatch(getUserDisciplines());
    resetAllForms(dispatch);
  }
};

export const logout = () => dispatch => {
  dispatch(clearAuth());
  clearAuthToken();
  resetAllForms(dispatch);
  dispatch(artistSearchSuccess([]));
};

export const login = (email, password, firstTime = false) => dispatch => {
  dispatch(authRequest());
  return fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  })
    .then(res => res.json())
    .then(({ authToken }) => {
      storeAuthInfo(authToken, dispatch);
    })
    .then(() => {
      dispatch(getUserDisciplines());
      dispatch(reset("login"));

      // If they're already logged, it closes instead of going to the next form
      if (!firstTime) {
        dispatch(closeModal());
      }
    })
    .catch(err => {
      const { code } = err;
      const message =
        code === 401
          ? "Incorrect username or password"
          : "Unable to login, please try again";
      err.message = message;
      dispatch(authError(err));
      // Could not authenticate, so return a SubmissionError for Redux
      // Form
      return Promise.reject(
        new SubmissionError({
          _error: message
        })
      );
    });
};

export const refreshAuthToken = () => (dispatch, getState) => {
  dispatch(authRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      // Provide our existing token as credentials to get a new one
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => res.json())
    .then(({ authToken }) => storeAuthInfo(authToken, dispatch))
    .catch(err => {
      // We couldn't get a refresh token because our current credentials
      // are invalid or expired, or something else went wrong, so clear
      // them and sign us out
      resetAllForms(dispatch);
      dispatch(authError(err));
      dispatch(clearAuth());
      clearAuthToken();
    });
};
