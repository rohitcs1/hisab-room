import apiRequest from './api.js';

export const profileService = {
  async getProfile() {
    return apiRequest('/api/profile');
  },

  async updateProfile(profileData) {
    return apiRequest('/api/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  async uploadAvatar(formData) {
    return fetch(`${import.meta.env.VITE_API_BASE_URL}/api/profile/avatar`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    }).then(response => {
      if (!response.ok) {
        const errorData = response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(errorData.error || 'Request failed');
      }
      return response.json();
    });
  },
};