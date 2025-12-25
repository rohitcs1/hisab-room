import { supabase } from '../config/supabase.js';

export const getAdminStats = async (req, res) => {
  try {
    // Get user count
    const { count: userCount, error: userError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    if (userError) {
      console.error('Error fetching user count:', userError);
    }

    // Get group count
    const { count: groupCount, error: groupError } = await supabase
      .from('groups')
      .select('*', { count: 'exact', head: true });

    if (groupError) {
      console.error('Error fetching group count:', groupError);
    }

    // Get total expenses
    const { data: expenses, error: expenseError } = await supabase
      .from('expenses')
      .select('amount');

    let totalExpenses = 0;
    if (!expenseError && expenses) {
      totalExpenses = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
    }

    res.json({
      stats: {
        totalUsers: userCount || 0,
        totalGroups: groupCount || 0,
        totalExpenses: totalExpenses,
      }
    });
  } catch (err) {
    console.error('Admin stats error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }

    res.json({ users: users || [] });
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllGroups = async (req, res) => {
  try {
    const { data: groups, error } = await supabase
      .from('groups')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching groups:', error);
      return res.status(500).json({ error: 'Failed to fetch groups' });
    }

    res.json({ groups: groups || [] });
  } catch (err) {
    console.error('Get groups error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};