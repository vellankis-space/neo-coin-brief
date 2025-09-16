import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key exists:', !!supabaseAnonKey);
console.log('Supabase Service Role Key exists:', !!supabaseServiceRoleKey);

if (supabaseUrl && (supabaseAnonKey || supabaseServiceRoleKey)) {
  // Test with anon key first
  if (supabaseAnonKey) {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Test basic connection
    supabase
      .from('users')  // This will likely fail but we'll see the error
      .select('count()', { count: 'exact' })
      .then(({ data, error }) => {
        if (error) {
          console.log('Supabase connection with anon key - Error (expected for non-existent table):', error.message);
        } else {
          console.log('Supabase connection with anon key successful. Row count:', data);
        }
      });
  }
  
  // Test with service role key for admin operations
  if (supabaseServiceRoleKey) {
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    // Test admin access
    supabaseAdmin.auth.admin.listUsers()
      .then(({ data, error }) => {
        if (error) {
          console.log('Supabase admin access - Error:', error.message);
        } else {
          console.log('Supabase admin access successful. Users count:', data?.users?.length || 0);
        }
      });
  }
} else {
  console.log('Missing Supabase credentials');
  console.log('VITE_SUPABASE_URL exists:', !!process.env.VITE_SUPABASE_URL);
  console.log('SUPABASE_URL exists:', !!process.env.SUPABASE_URL);
  console.log('VITE_SUPABASE_ANON_KEY exists:', !!process.env.VITE_SUPABASE_ANON_KEY);
  console.log('SUPABASE_ANON_KEY exists:', !!process.env.SUPABASE_ANON_KEY);
  console.log('SUPABASE_SERVICE_ROLE_KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
}