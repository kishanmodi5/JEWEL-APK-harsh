import axios from 'axios';
import { BACKEND_APP_URL, IMG_PATH } from '../config'; 

const jwtAuthAxios = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: BACKEND_APP_URL,
});


jwtAuthAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const setAuthToken = (data) => {
  if (data) {
    jwtAuthAxios.defaults.headers.common["Authorization"] =
      "Bearer " + data.token;
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
  } else {
    delete jwtAuthAxios.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

export default jwtAuthAxios;