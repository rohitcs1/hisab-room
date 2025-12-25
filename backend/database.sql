-- HisabRoom Database Setup
-- Run these queries in Supabase SQL Editor to set up the database for login and signup functionality

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE,
  phone TEXT UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Create index on phone for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);

-- Note: Row Level Security is disabled for service role access
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Test query to verify table creation
-- SELECT * FROM users LIMIT 5;