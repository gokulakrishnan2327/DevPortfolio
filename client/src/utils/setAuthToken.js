// src/utils/setAuthToken.js
import API from './api';

/**
 * Set token to header for all future requests
 * @param {String} token
 */
const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete API.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
