import { supabase } from './src/config/supabase.js';

async function createAdminUser() {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: 'starhacker160@gmail.com',
      password: 'Kali@8320191025',
    });

    if (error) {
      console.error('Error creating admin user:', error);
      return;
    }

    console.log('Admin user created successfully:', data.user.email);
    console.log('User ID:', data.user.id);

    // You can also store additional admin info in a users table if needed
    // For now, we'll check the email in the auth middleware

  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

createAdminUser();