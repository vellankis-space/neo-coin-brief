import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, status = 'completed', transaction_id } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    try {
      const updateData = { 
        status: status
      };

      // Add transaction ID if provided
      if (transaction_id) {
        updateData.cashfree_transaction_id = transaction_id;
      }

      const { data, error } = await supabase
        .from('subscriptions')
        .update(updateData)
        .eq('email', email)
        .select();

      if (error) {
        console.error('Supabase update error:', error);
        return res.status(500).json({ error: error.message });
      }

      if (!data || data.length === 0) {
        console.warn(`No subscription found for email: ${email}`);
        return res.status(404).json({ error: 'Subscription not found.' });
      }

      res.status(200).json({ 
        message: 'Subscription status updated successfully!', 
        data,
        status: status,
        transaction_id: transaction_id
      });
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
