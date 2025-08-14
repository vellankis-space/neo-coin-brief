import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Ensure we can handle JSON and x-www-form-urlencoded payloads from Cashfree
      const parseRequestBody = async () => {
        const existing = req.body && Object.keys(req.body).length > 0 ? req.body : null;
        if (existing) return existing;
        const chunks = [];
        for await (const chunk of req) {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        }
        const raw = Buffer.concat(chunks).toString('utf8');
        const contentType = (req.headers['content-type'] || '').toLowerCase();
        if (contentType.includes('application/json')) {
          try { return JSON.parse(raw || '{}'); } catch { return {}; }
        }
        if (contentType.includes('application/x-www-form-urlencoded')) {
          const params = new URLSearchParams(raw);
          const obj = {};
          for (const [k, v] of params.entries()) obj[k] = v;
          return obj;
        }
        // Fallback attempt: try JSON first, then URLSearchParams
        try { return JSON.parse(raw || '{}'); } catch {}
        try {
          const params = new URLSearchParams(raw);
          const obj = {};
          for (const [k, v] of params.entries()) obj[k] = v;
          return obj;
        } catch {
          return {};
        }
      };

      const payload = await parseRequestBody();

      // Support multiple Cashfree payload shapes
      const {
        orderId,
        orderAmount,
        referenceId,
        txStatus,
        txTime,
        txMsg,
        signature,
        customerEmail,
        // alternate keys that may appear
        email,
        transactionId,
        status,
        customer_email
      } = payload || {};

      console.log('Cashfree webhook received:', {
        orderId,
        orderAmount,
        referenceId,
        txStatus,
        customerEmail: customerEmail || customer_email || email
      });

      // Verify the webhook signature (you should implement this for security)
      // const isValidSignature = verifyCashfreeSignature(req.body, signature);
      // if (!isValidSignature) {
      //   return res.status(400).json({ error: 'Invalid signature' });
      // }

      // Determine the status based on Cashfree transaction status
      const effectiveStatus = (txStatus || status || '').toUpperCase();
      let subscriptionStatus = 'pending';
      if (effectiveStatus === 'SUCCESS') {
        subscriptionStatus = 'completed';
      } else if (effectiveStatus === 'FAILED' || effectiveStatus === 'CANCELLED') {
        subscriptionStatus = 'failed';
      }

      // Update the subscription record
      const { data, error } = await supabase
        .from('subscriptions')
        .update({ 
          status: subscriptionStatus,
          cashfree_transaction_id: referenceId || transactionId || orderId || null,
        })
        .eq('email', customerEmail || customer_email || email)
        .select();

      if (error) {
        console.error('Supabase update error:', error);
        return res.status(500).json({ error: error.message });
      }

      if (!data || data.length === 0) {
        console.warn(`No subscription found for email: ${customerEmail}`);
        return res.status(404).json({ error: 'Subscription not found.' });
      }

      console.log(`Subscription updated for ${customerEmail || email}: ${subscriptionStatus}`);

      res.status(200).json({ 
        message: 'Webhook processed successfully',
        status: subscriptionStatus,
        transaction_id: referenceId || transactionId || orderId
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