import axios from 'axios';
const apiClient = axios.create({
  baseURL: 'http://www.mocky.io/v2/',
  headers: { 'Content-Type': 'application/json' },
});

export default apiClient;
