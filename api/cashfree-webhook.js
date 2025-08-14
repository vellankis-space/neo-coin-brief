import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { 
        orderId, 
        orderAmount, 
        referenceId, 
        txStatus, 
        txTime, 
        txMsg, 
        signature,
        customerEmail 
      } = req.body;

      console.log('Cashfree webhook received:', {
        orderId,
        orderAmount,
        referenceId,
        txStatus,
        customerEmail
      });

      // Verify the webhook signature (you should implement this for security)
      // const isValidSignature = verifyCashfreeSignature(req.body, signature);
      // if (!isValidSignature) {
      //   return res.status(400).json({ error: 'Invalid signature' });
      // }

      // Determine the status based on Cashfree transaction status
      let subscriptionStatus = 'pending';
      if (txStatus === 'SUCCESS') {
        subscriptionStatus = 'completed';
      } else if (txStatus === 'FAILED' || txStatus === 'CANCELLED') {
        subscriptionStatus = 'failed';
      }

      // Update the subscription record
      const { data, error } = await supabase
        .from('subscriptions')
        .update({ 
          status: subscriptionStatus,
          cashfree_transaction_id: referenceId || orderId,
          updated_at: new Date().toISOString()
        })
        .eq('email', customerEmail)
        .select();

      if (error) {
        console.error('Supabase update error:', error);
        return res.status(500).json({ error: error.message });
      }

      if (!data || data.length === 0) {
        console.warn(`No subscription found for email: ${customerEmail}`);
        return res.status(404).json({ error: 'Subscription not found.' });
      }

      console.log(`Subscription updated for ${customerEmail}: ${subscriptionStatus}`);

      res.status(200).json({ 
        message: 'Webhook processed successfully',
        status: subscriptionStatus,
        transaction_id: referenceId || orderId
      });

    } catch (error) {
      console.error('Webhook processing error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 