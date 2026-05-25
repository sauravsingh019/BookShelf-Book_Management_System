import axios from 'axios';

const DEFAULT_BASE_URL = 'https://6a1455156c7db8aac0545096.mockapi.io/api/v1';

const baseURL = (
  process.env.REACT_APP_API_BASE_URL ||
  DEFAULT_BASE_URL
).replace(/\/$/, '');

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const booksApi = {
  getAll: () => api.get('/books'),
  getById: (id) => api.get(`/books/${id}`),
  create: (data) => api.post('/books', data),
  update: (id, data) => api.put(`/books/${id}`, data),
  delete: (id) => api.delete(`/books/${id}`),
};

export { baseURL };
export default api;
