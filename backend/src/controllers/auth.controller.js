import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase.js';

export const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Use Supabase auth to create user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Create a custom JWT for our API
    const token = jwt.sign(
      { id: data.user.id, email: data.user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: data.user.id,
        email: data.user.email,
        isAdmin: data.user.email === 'starhacker160@gmail.com',
      },
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Use Supabase auth to sign in user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Create a custom JWT for our API
    const token = jwt.sign(
      { id: data.user.id, email: data.user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      token,
      user: {
        id: data.user.id,
        email: data.user.email,
        isAdmin: data.user.email === 'starhacker160@gmail.com',
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};