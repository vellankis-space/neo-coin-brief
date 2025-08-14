import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    try {
      // First, check if email already exists
      const { data: existingData, error: checkError } = await supabase
        .from('subscriptions')
        .select('email, status')
        .eq('email', email)
        .single();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found" error
        console.error('Supabase check error:', checkError);
        return res.status(500).json({ error: checkError.message });
      }

      if (existingData) {
        // Email already exists, update status to pending if needed
        const { data: updateData, error: updateError } = await supabase
          .from('subscriptions')
          .update({ status: 'pending' })
          .eq('email', email);

        if (updateError) {
          console.error('Supabase update error:', updateError);
          return res.status(500).json({ error: updateError.message });
        }

        res.status(200).json({ message: 'Email updated successfully!', data: updateData });
      } else {
        // Email doesn't exist, insert new record
        const { data: insertData, error: insertError } = await supabase
          .from('subscriptions')
          .insert([{ 
            email: email, 
            status: 'pending',
            cashfree_transaction_id: null // Add this field since you renamed it
          }]);

        if (insertError) {
          console.error('Supabase insert error:', insertError);
          return res.status(500).json({ error: insertError.message });
        }

        res.status(200).json({ message: 'Email saved successfully!', data: insertData });
      }
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}