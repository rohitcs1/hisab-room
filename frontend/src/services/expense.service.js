import apiRequest from './api.js';

export const expenseService = {
  async getExpenses(groupId) {
    return apiRequest(`/api/expenses/${groupId}`);
  },

  async createExpense(expenseData) {
    return apiRequest('/api/expenses', {
      method: 'POST',
      body: JSON.stringify(expenseData),
    });
  },
};