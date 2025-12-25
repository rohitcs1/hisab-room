import apiRequest from './api.js';

export const adminService = {
  async getStats() {
    return apiRequest('/api/admin/stats');
  },

  async getAllUsers() {
    return apiRequest('/api/admin/users');
  },

  async getAllGroups() {
    return apiRequest('/api/admin/groups');
  },
};