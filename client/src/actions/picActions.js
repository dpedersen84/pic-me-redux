import axios from "axios";

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  PIC_LOADING,
  GET_PICS,
  GET_PIC,
  DELETE_PIC,
  GET_USER_PICS,
  ADD_PIC,
  SEARCH_PIC
} from "./types";

// Get all pics
export const getPics = () => dispatch => {
  dispatch(setPicLoading());
  axios
    .get("/api/pics")
    .then(res =>
      dispatch({
        type: GET_PICS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PICS,
        payload: null
      })
    );
};

// Get single pic
export const getPic = id => dispatch => {
  dispatch(setPicLoading());
  axios
    .get(`/api/pics/${id}`)
    .then(res =>
      dispatch({
        type: GET_PIC,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PICS,
        payload: null
      })
    );
};

// Get user pics
export const getUserPics = id => dispatch => {
  dispatch(setPicLoading());
  axios
    .get(`/api/pics/user/${id}`)
    .then(res =>
      dispatch({
        type: GET_USER_PICS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PICS,
        payload: null
      })
    );
};

// Add pic
export const addPic = picData => dispatch => {
  axios
    .post("/api/pics", picData)
    .then(res =>
      dispatch({
        type: ADD_PIC,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PICS,
        payload: null
      })
    );
};

// Delete pic
export const deletePic = id => dispatch => {
  axios
    .delete(`/api/pics/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_PIC,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Search pic
export const searchPic = searchTerm => dispatch => {
  dispatch(setPicLoading());
  axios
    .get(
      `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&limit=1`
    )
    .then(res =>
      dispatch({
        type: SEARCH_PIC,
        payload: res.data.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PICS,
        payload: null
      })
    );
};

// Add like
export const addLike = id => dispatch => {
  axios
    .post(`/api/pics/like/${id}`)
    .then(res => dispatch(getPics()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/pics/unlike/${id}`)
    .then(res => dispatch(getPics()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add comment
export const addComment = (picId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/pics/comments/${picId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_PIC,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove comment
export const deleteComment = (picId, commentId) => dispatch => {
  axios
    .delete(`/api/pics/comments/${picId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_PIC,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setPicLoading = () => {
  return {
    type: PIC_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
