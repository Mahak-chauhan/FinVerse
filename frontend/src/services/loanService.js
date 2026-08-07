import api from '../apis/axiosConfig';

export const checkEligibility = (data) => api.post('/loans/check', data);

export const getLoanHistory = () => api.get('/loans/history');
