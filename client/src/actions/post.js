import API from '../utils/api';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  REMOVE_COMMENT,
  ADD_COMMENT,
} from './types';
import { setAlert } from './alert';

export const getPosts = () => async (dispatch) => {
  try {
    const res = await API.get('/posts');
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    dispatch({ type: POST_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
  }
};

export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await API.get(`/posts/${postId}`);
    dispatch({ type: GET_POST, payload: res.data });
  } catch (err) {
    dispatch({ type: POST_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
  }
};

export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await API.put(`/posts/like/${postId}`);
    dispatch({ type: UPDATE_LIKES, payload: { postId, likes: res.data } });
  } catch (err) {
    dispatch({ type: POST_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
  }
};

export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await API.put(`/posts/unlike/${postId}`);
    dispatch({ type: UPDATE_LIKES, payload: { postId, likes: res.data } });
  } catch (err) {
    dispatch({ type: POST_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await API.delete(`/posts/${postId}`);
    dispatch({ type: DELETE_POST, payload: postId });
    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({ type: POST_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
  }
};

export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await API.post('/posts', formData);
    dispatch({ type: ADD_POST, payload: res.data });
    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({ type: POST_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
  }
};

export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await API.post(`/posts/comment/${postId}`, formData);
    dispatch({ type: ADD_COMMENT, payload: res.data });
    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({ type: POST_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await API.delete(`/posts/comment/${postId}/${commentId}`);
    dispatch({ type: REMOVE_COMMENT, payload: commentId });
    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({ type: POST_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
  }
};
