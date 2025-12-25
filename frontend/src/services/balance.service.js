import apiRequest from './api.js';

export const balanceService = {
  async getBalance(groupId) {
    return apiRequest(`/api/balance/${groupId}`);
  },
};