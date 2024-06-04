import axios from "axios";

export const api = axios.create({
  baseURL: `https://dentist-backend-phee.onrender.com/api`,
  timeout: 10000,
  headers: {'X-Custom-Header': 'foobar'},
  withCredentials: true
});
