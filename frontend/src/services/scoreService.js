import api from '../apis/axiosConfig';

export const getHealthScore = () => api.get('/scores/health');

export const getCreditScore = () => api.get('/scores/credit');
