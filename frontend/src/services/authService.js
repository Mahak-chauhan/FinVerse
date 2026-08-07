import api from '../apis/axiosConfig';

export const register = (userData) => api.post('/auth/register', userData);

export const login = (userData) => api.post('/auth/login', userData);

export const getMe = () => api.get('/auth/me');
