import apiRequest from './api.js';

export const groupService = {
  async getUserGroups(userId) {
    return apiRequest('/api/groups');
  },

  async getGroupDetails(groupId) {
    return apiRequest(`/api/groups/${groupId}`);
  },

  async createGroup(groupData) {
    return apiRequest('/api/groups', {
      method: 'POST',
      body: JSON.stringify(groupData),
    });
  },

  async joinGroup(groupId, userId) {
    return apiRequest(`/api/groups/${groupId}/join`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  },
};