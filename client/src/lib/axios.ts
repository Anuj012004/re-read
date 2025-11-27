import axios from "axios";

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://re-read.onrender.com'
    : 'http://localhost:2121',
  withCredentials: true,
});

export default api;
