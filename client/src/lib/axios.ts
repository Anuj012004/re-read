import axios from "axios";

const api = axios.create({
  baseURL: 'https://re-read.onrender.com/api',
  withCredentials: true,
});

export default api;
