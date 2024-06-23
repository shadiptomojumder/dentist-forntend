import axios from "axios";

export const api = axios.create({
  baseURL: `https://dentist-backend-production.up.railway.app/api`,
  timeout: 10000,
  headers: {'X-Custom-Header': 'foobar'},
  withCredentials: true
});

// https://dentist-backend-phee.onrender.com
// https://dentist-backend-one.vercel.app
// http://localhost:5000
