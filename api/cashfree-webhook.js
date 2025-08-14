import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Prefer service role key on server to bypass RLS for webhooks
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey || supabaseAnonKey);
console.log('Supabase using service role:', Boolean(supabaseServiceRoleKey));

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
      console.log('Webhook payload keys:', Object.keys(payload || {}));

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
      if (['SUCCESS', 'PAID', 'COMPLETED'].includes(effectiveStatus)) {
        subscriptionStatus = 'completed';
      } else if (effectiveStatus === 'FAILED' || effectiveStatus === 'CANCELLED') {
        subscriptionStatus = 'failed';
      }

      const identifiedEmail = (customerEmail || customer_email || email || '').toLowerCase().trim() || null;
      const transactionIdentifier = referenceId || transactionId || orderId || null;

      let data = null;
      let error = null;

      // First try: update by transaction id if we already attached it previously
      if (transactionIdentifier) {
        const updateByTxn = await supabase
          .from('subscriptions')
          .update({
            status: subscriptionStatus,
          })
          .eq('cashfree_transaction_id', transactionIdentifier)
          .select();
        if (updateByTxn.error) {
          error = updateByTxn.error;
        } else if (updateByTxn.data && updateByTxn.data.length > 0) {
          data = updateByTxn.data;
          console.log('Update by transaction id result:', { matched: data.length, transactionIdentifier });
        }
      }

      if (!data && !error && identifiedEmail) {
        // Primary path: update by email
        const updateResponse = await supabase
          .from('subscriptions')
          .update({ 
            status: subscriptionStatus,
            cashfree_transaction_id: transactionIdentifier,
          })
          .ilike('email', identifiedEmail)
          .select();
        data = updateResponse.data;
        error = updateResponse.error;
        console.log('Update by email result:', { matched: data?.length || 0, email: identifiedEmail });

        // If nothing matched by email, attempt fallback strategy as well
        if (!error && (!data || data.length === 0)) {
          // Try upsert/insert if we have an email
          const upsertPayload = [{
            email: identifiedEmail,
            status: subscriptionStatus,
            cashfree_transaction_id: transactionIdentifier,
          }];
          const upsertResp = await supabase
            .from('subscriptions')
            .upsert(upsertPayload, { onConflict: 'email' })
            .select();
          if (!upsertResp.error) {
            data = upsertResp.data;
            console.log('Upsert by email result:', { matched: data?.length || 0, email: identifiedEmail });
          }

          if (!data || data.length === 0) {
            const { data: pendingRows, error: findError } = await supabase
              .from('subscriptions')
              .select('id, email, status')
              .eq('status', 'pending')
              .order('created', { ascending: false })
              .limit(1);

            if (!findError && pendingRows && pendingRows.length > 0) {
              const targetId = pendingRows[0].id;
              const updateFallback = await supabase
                .from('subscriptions')
                .update({
                  status: subscriptionStatus,
                  cashfree_transaction_id: transactionIdentifier,
                })
                .eq('id', targetId)
                .select();
              data = updateFallback.data;
              error = updateFallback.error;
              console.log('Fallback update after email miss:', { targetId, matched: data?.length || 0 });
            }
          }
        }
      } else if (transactionIdentifier) {
        // Fallback: locate most recent pending record and update by id
        const { data: pendingRows, error: findError } = await supabase
          .from('subscriptions')
          .select('id, email, status')
          .eq('status', 'pending')
          .order('created', { ascending: false })
          .limit(1);

        if (findError) {
          error = findError;
        } else if (pendingRows && pendingRows.length > 0) {
          const targetId = pendingRows[0].id;
          const updateResponse = await supabase
            .from('subscriptions')
            .update({
              status: subscriptionStatus,
              cashfree_transaction_id: transactionIdentifier,
            })
            .eq('id', targetId)
            .select();
          data = updateResponse.data;
          error = updateResponse.error;
          console.log('Update by fallback pending record:', { targetId, matched: data?.length || 0 });
        } else {
          data = [];
          console.warn('No pending subscription found to attach transaction when email missing.');
        }
      } else {
        console.warn('Webhook missing both email and transaction identifiers.');
        return res.status(400).json({ error: 'Missing email/transaction identifiers in webhook.' });
      }

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