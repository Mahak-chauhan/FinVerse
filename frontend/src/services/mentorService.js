import api from '../apis/axiosConfig';

export const getConversations = () => api.get('/mentor');

export const createConversation = (data = {}) => api.post('/mentor', data);

export const getConversation = (id) => api.get(`/mentor/${id}`);

export const deleteConversation = (id) => api.delete(`/mentor/${id}`);

export const sendMessage = (id, content) =>
  api.post(`/mentor/${id}/messages`, { content });
