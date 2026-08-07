import api from '../apis/axiosConfig';

export const updateProfile = (data) => api.put('/users/profile', data);

export const updatePassword = (data) => api.put('/users/password', data);
