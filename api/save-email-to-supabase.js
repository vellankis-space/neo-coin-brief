import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

console.log('API route loaded');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Environment variables:', {
  hasUrl: Boolean(supabaseUrl),
  hasAnonKey: Boolean(supabaseAnonKey),
  hasServiceKey: Boolean(supabaseServiceRoleKey),
});

// Use service role key for server-side operations
const supabase = createClient(
  supabaseUrl || '', 
  supabaseServiceRoleKey || supabaseAnonKey || ''
);

console.log('Supabase client created');

export default async function handler(req, res) {
  console.log('Received request:', req.method, req.body);
  
  if (req.method === 'POST') {
    const { email } = req.body;
    const normalizedEmail = (email || '').toLowerCase().trim();
    console.log('Normalized email:', normalizedEmail);

    if (!normalizedEmail) {
      console.log('Email is required');
      return res.status(400).json({ error: 'Email is required.' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      console.log('Invalid email format');
      return res.status(400).json({ error: 'Invalid email format.' });
    }

    if (!supabaseUrl || !(supabaseServiceRoleKey || supabaseAnonKey)) {
      console.error('Supabase env missing:', {
        hasUrl: Boolean(supabaseUrl),
        hasKey: Boolean(supabaseServiceRoleKey || supabaseAnonKey),
      });
      return res.status(500).json({ error: 'Server misconfiguration: Supabase env not set.' });
    }

    try {
      console.log('Checking if user exists (via listUsers):', normalizedEmail);
      // Fallback approach: list users and match by email
      // Note: For large user bases, you may need pagination. For this use case it's fine.
      const { data: listData, error: listError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
      if (listError) {
        console.error('Supabase auth listUsers error:', listError);
        return res.status(500).json({ error: listError.message || 'Failed to list users' });
      }

      const existingUser = listData?.users?.find(u => (u.email || '').toLowerCase() === normalizedEmail);
      console.log('Existing user lookup result:', { found: Boolean(existingUser), id: existingUser?.id });

      if (existingUser) {
        console.log('User exists, updating metadata');
        // User already exists, we can update their metadata if needed
        const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(
          existingUser.id,
          {
            user_metadata: {
              ...existingUser.user_metadata,
              subscription_status: 'active',
              updated_at: new Date().toISOString()
            }
          }
        );

        if (updateError) {
          console.error('Supabase auth update error:', updateError);
          return res.status(500).json({ error: updateError.message });
        }

        res.status(200).json({ 
          message: "You're already subscribed. We've refreshed your preferences.", 
          user: updateData.user 
        });
      } else {
        console.log('User does not exist, creating new user');
        // User doesn't exist, create a new user with email only (no password)
        // This is for email-only subscriptions
        const { data: signUpData, error: signUpError } = await supabase.auth.admin.createUser({
          email: normalizedEmail,
          email_confirm: true, // Auto-confirm email
          user_metadata: {
            subscription_status: 'active',
            subscribed_at: new Date().toISOString()
          }
        });

        if (signUpError) {
          console.error('Supabase auth signup error:', signUpError);
          // If email already exists (race condition or pagination miss), treat as already subscribed
          if ((signUpError.message || '').toLowerCase().includes('email')) {
            return res.status(200).json({ message: "You're already subscribed. We've refreshed your preferences." });
          }
          return res.status(500).json({ error: signUpError.message });
        }

        res.status(200).json({ 
          message: 'Email subscribed successfully!', 
          user: signUpData.user 
        });
      }
    } catch (error) {
      console.error('Server error:', error);
      console.error('Error stack:', error.stack);
      res.status(500).json({ error: 'Internal server error.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
