import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const validateToken = async (token) => {
  return axios.get(`${API_URL}/user-details`, {
    params: {
      userToken: token
    }
  })
}

export const getMedia = async (token) => {
  return axios.get(`${API_URL}/user-media`, {
    params: {
      userToken: token
    }
  });
}

export const getPaginatedMedia = async ({next = '', previous = ''}={}) => {
  return axios.get(`${API_URL}/page-media`, {
    params: {
      next,
      previous
    }
  });
}