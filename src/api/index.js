import axios from 'axios';

const instance = axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL: 'http://localhost:5001/api',
});

export default instance;
