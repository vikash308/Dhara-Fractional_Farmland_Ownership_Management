import axios from "axios";
import server from "../api";

const api = axios.create({
  baseURL: server,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("dhara_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
