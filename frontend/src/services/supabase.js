import { createClient } from '@supabase/supabase-js'

// Placeholder Supabase configuration
// Replace with your actual Supabase URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Group service
export const groupService = {
  async getUserGroups(userId) {
    // Placeholder: Returns mock data
    return {
      data: [
        {
          id: '1',
          name: 'Apartment 3B',
          avatar: null,
          totalExpense: 12500,
          memberCount: 4,
          lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          id: '2',
          name: 'Goa Trip',
          avatar: null,
          totalExpense: 8500,
          memberCount: 6,
          lastActivity: new Date(Date.now() - 5 * 60 * 60 * 1000),
        },
      ],
      error: null,
    }
  },

  async getGroupDetails(groupId) {
    return {
      data: {
        id: groupId,
        name: 'Apartment 3B',
        memberCount: 4,
        totalExpense: 12500,
        perPersonAverage: 3125,
        members: [
          { id: '1', name: 'You', avatar: null },
          { id: '2', name: 'Rahul', avatar: null },
          { id: '3', name: 'Priya', avatar: null },
          { id: '4', name: 'Amit', avatar: null },
        ],
      },
      error: null,
    }
  },

  async createGroup(name, userId) {
    return {
      data: { id: Date.now().toString(), name },
      error: null,
    }
  },
}

// Expense service
export const expenseService = {
  async getGroupExpenses(groupId, filter = 'month') {
    return {
      data: [
        {
          id: '1',
          category: 'grocery',
          amount: 1200,
          paidBy: { id: '1', name: 'You' },
          date: new Date(),
          note: 'Weekly groceries',
        },
        {
          id: '2',
          category: 'rent',
          amount: 8000,
          paidBy: { id: '2', name: 'Rahul' },
          date: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      ],
      error: null,
    }
  },

  async addExpense(groupId, expenseData) {
    return {
      data: { id: Date.now().toString(), ...expenseData },
      error: null,
    }
  },
}

// Balance service
export const balanceService = {
  async getGroupBalance(groupId) {
    return {
      data: {
        balances: [
          { userId: '1', name: 'You', amount: 500, type: 'receive' },
          { userId: '2', name: 'Rahul', amount: -1200, type: 'owe' },
          { userId: '3', name: 'Priya', amount: 700, type: 'receive' },
          { userId: '4', name: 'Amit', amount: 0, type: 'settled' },
        ],
        settlements: [
          { from: 'Rahul', to: 'You', amount: 500 },
          { from: 'Rahul', to: 'Priya', amount: 700 },
        ],
      },
      error: null,
    }
  },
}


