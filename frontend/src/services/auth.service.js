import apiRequest from './api.js';

export const signup = async (email, password) => {
  return apiRequest('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const login = async (email, password) => {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};