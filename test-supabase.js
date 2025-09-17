require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key exists:', !!supabaseAnonKey);

if (supabaseUrl && supabaseAnonKey) {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  // Test connection
  supabase
    .from('subscriptions')
    .select('count()', { count: 'exact' })
    .then(({ data, error }) => {
      if (error) {
        console.error('Supabase connection error:', error);
      } else {
        console.log('Supabase connection successful. Row count:', data);
      }
    });
} else {
  console.log('Missing Supabase credentials');
}