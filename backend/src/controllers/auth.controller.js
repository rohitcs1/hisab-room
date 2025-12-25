import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase.js';

export const signup = async (req, res) => {
  const { email, phone, password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  if (!email && !phone) {
    return res.status(400).json({ error: 'Either email or phone is required' });
  }

  if (email && phone) {
    return res.status(400).json({ error: 'Provide either email or phone, not both' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      email: email || null,
      phone: phone || null,
      password: hashedPassword,
    };

    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select('id, email, phone, created_at')
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.status(400).json({ error: 'Email or phone already exists' });
      }
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: data.id,
        email: data.email,
        phone: data.phone,
        created_at: data.created_at
      }
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req, res) => {
  const { email, phone, password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  if (!email && !phone) {
    return res.status(400).json({ error: 'Either email or phone is required' });
  }

  if (email && phone) {
    return res.status(400).json({ error: 'Provide either email or phone, not both' });
  }

  try {
    let query = supabase.from('users').select('id, email, phone, password, created_at');

    if (email) {
      query = query.eq('email', email);
    } else {
      query = query.eq('phone', phone);
    }

    const { data, error } = await query.single();

    if (error || !data) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, data.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: data.id,
        email: data.email,
        phone: data.phone,
        created_at: data.created_at
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};