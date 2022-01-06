import axios from 'axios';

export const API_STORE = axios.create({
  baseURL: 'https://leulseged-store-api.herokuapp.com/',
  // baseURL: 'http://10.0.2.2:3000/'
});