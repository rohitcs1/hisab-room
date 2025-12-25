import dotenv from 'dotenv';

// Load environment variables from backend/.env
dotenv.config();

import app from './app.js';

// Debug logs (can remove later)
console.log('SUPABASE_URL loaded:', process.env.SUPABASE_URL ? 'yes' : 'no');
console.log(
  'SUPABASE_SERVICE_ROLE_KEY loaded:',
  process.env.SUPABASE_SERVICE_ROLE_KEY ? 'yes' : 'no'
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 HisabRoom Backend running on port ${PORT}`);
});
