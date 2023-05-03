/* eslint-disable no-param-reassign */
import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://127.0.0.1:3001',
});

Axios.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default Axios;
