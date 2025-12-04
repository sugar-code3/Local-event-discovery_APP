import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const fetchAllEvents = (params = {}) =>
  API.get('/events', { params }); // Accepts page, limit, keyword, etc.

export const fetchFeaturedEvents = () => API.get('/events/featured');
export const fetchWeekendEvents = () => API.get('/events/weekend');




