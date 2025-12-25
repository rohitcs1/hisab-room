import { createClient } from '@supabase/supabase-js'

// Placeholder Supabase configuration
// This file is deprecated - use individual service files instead
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Only create client if credentials are available
let supabase = null;
if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder') && !supabaseAnonKey.includes('placeholder')) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }

// Deprecated services - use individual service files instead
export const groupService = {
  async getUserGroups(userId) {
    console.warn('groupService from supabase.js is deprecated. Use group.service.js instead.')
    return { data: [], error: 'Deprecated service' }
  },
  async getGroupDetails(groupId) {
    console.warn('groupService from supabase.js is deprecated. Use group.service.js instead.')
    return { data: null, error: 'Deprecated service' }
  },
  async createGroup(name, userId) {
    console.warn('groupService from supabase.js is deprecated. Use group.service.js instead.')
    return { data: null, error: 'Deprecated service' }
  },
  async joinGroup(groupId, userId) {
    console.warn('groupService from supabase.js is deprecated. Use group.service.js instead.')
    return { data: null, error: 'Deprecated service' }
  },
}

export const expenseService = {
  async getGroupExpenses(groupId, filter = 'month') {
    console.warn('expenseService from supabase.js is deprecated. Use expense.service.js instead.')
    return { data: [], error: 'Deprecated service' }
  },
  async addExpense(groupId, expenseData) {
    console.warn('expenseService from supabase.js is deprecated. Use expense.service.js instead.')
    return { data: null, error: 'Deprecated service' }
  },
}

export const balanceService = {
  async getGroupBalance(groupId) {
    console.warn('balanceService from supabase.js is deprecated. Use balance.service.js instead.')
    return { data: null, error: 'Deprecated service' }
  },
}

