import axios from "axios";

const BASE_URL_LOCAL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL_LOCAL || "http://localhost:3333",
});

export default api;
