import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase = null;
if (supabaseUrl && supabaseServiceRoleKey) {
  supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  console.log('Supabase client initialized successfully');
} else {
  console.warn('Supabase environment variables not set. Supabase client not initialized.');
}

export { supabase };