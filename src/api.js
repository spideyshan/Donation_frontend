import axios from 'axios';
const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api', headers: { 'Content-Type': 'application/json' } });
API.interceptors.response.use(res => res, err => { return Promise.reject(err); });
export default API;