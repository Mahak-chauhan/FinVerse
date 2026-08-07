import api from '../apis/axiosConfig';

export const getTransactions = (params = {}) =>
  api.get('/transactions', { params });

export const getSummary = () => api.get('/transactions/summary');

export const createTransaction = (data) => api.post('/transactions', data);

export const updateTransaction = (id, data) => api.put(`/transactions/${id}`, data);

export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);
