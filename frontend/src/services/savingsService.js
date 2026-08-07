import api from '../apis/axiosConfig';

export const getGoals = () => api.get('/savings');

export const createGoal = (data) => api.post('/savings', data);

export const updateGoal = (id, data) => api.put(`/savings/${id}`, data);

export const deleteGoal = (id) => api.delete(`/savings/${id}`);
