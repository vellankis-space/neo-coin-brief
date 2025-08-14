import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl || '', supabaseServiceRoleKey || supabaseAnonKey || '');

const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
const CASHFREE_ENV = (process.env.CASHFREE_ENV || 'sandbox').toLowerCase(); // 'sandbox' | 'production'
const CASHFREE_API_BASE = CASHFREE_ENV === 'production'
  ? 'https://api.cashfree.com/pg'
  : 'https://sandbox.cashfree.com/pg';
const CASHFREE_PAYMENT_FORM_HANDLE = process.env.CASHFREE_PAYMENT_FORM_HANDLE || 'twitter-signals';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { email, amount } = req.body || {};
    const normalizedEmail = (email || '').toLowerCase().trim();

    if (!normalizedEmail) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    if (!supabaseUrl || !(supabaseServiceRoleKey || supabaseAnonKey)) {
      console.error('Supabase env missing for create order:', {
        hasUrl: Boolean(supabaseUrl),
        hasKey: Boolean(supabaseServiceRoleKey || supabaseAnonKey),
      });
      return res.status(500).json({ error: 'Server misconfiguration: Supabase env not set.' });
    }

    if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
      console.error('Cashfree credentials missing:', {
        hasAppId: Boolean(CASHFREE_APP_ID),
        hasSecret: Boolean(CASHFREE_SECRET_KEY),
        env: CASHFREE_ENV,
      });
      return res.status(500).json({ error: 'Cashfree configuration missing on server.' });
    }

    const orderAmount = Number(amount) || 800; // default amount in INR
    const orderId = `order_${Date.now()}`;
    const orderCurrency = 'INR';
    const host = req.headers['x-forwarded-host'] || req.headers.host || '';
    const protocol = (req.headers['x-forwarded-proto'] || 'https');
    const baseUrl = host ? `${protocol}://${host}` : '';
    const returnUrl = baseUrl ? `${baseUrl}/success?order_id={order_id}` : 'https://example.com/success?order_id={order_id}';

    // Create Cashfree PG Order
    const headers = {
      'x-client-id': CASHFREE_APP_ID,
      'x-client-secret': CASHFREE_SECRET_KEY,
      'x-api-version': '2022-09-01',
      'Content-Type': 'application/json',
    };

    const body = {
      order_id: orderId,
      order_amount: orderAmount,
      order_currency: orderCurrency,
      order_note: 'Neo Coin Brief - Subscription',
      customer_details: {
        customer_id: normalizedEmail,
        customer_email: normalizedEmail,
      },
      order_meta: {
        return_url: returnUrl,
      },
    };

    let cfResp;
    try {
      cfResp = await axios.post(`${CASHFREE_API_BASE}/orders`, body, { headers });
    } catch (err) {
      const data = err?.response?.data;
      console.error('Cashfree order create failed:', data || err.message || err);
      // Graceful fallback to Payment Form if authentication error or credential/config issue
      const status = err?.response?.status || 0;
      const errType = data?.type || '';
      if (status === 401 || status === 403 || errType === 'authentication_error') {
        const paymentFormUrl = `https://payments.cashfree.com/forms/${encodeURIComponent(CASHFREE_PAYMENT_FORM_HANDLE)}?customerEmail=${encodeURIComponent(normalizedEmail)}`;
        console.warn('Falling back to Cashfree Payment Form due to auth error.');
        return res.status(200).json({
          order_id: null,
          redirect_url: paymentFormUrl,
          payment_session_id: null,
          env: CASHFREE_ENV,
          fallback: 'payment_form'
        });
      }
      return res.status(502).json({ error: 'Failed to create Cashfree order.', details: data });
    }

    const { payment_session_id, payment_link } = cfResp.data || {};

    // Persist mapping: set cashfree_transaction_id to orderId for this email
    const upsertResp = await supabase
      .from('subscriptions')
      .upsert([{ email: normalizedEmail, status: 'pending', cashfree_transaction_id: orderId }], { onConflict: 'email' })
      .select();

    if (upsertResp.error) {
      console.error('Supabase upsert error (create order):', upsertResp.error);
      // do not block redirect; proceed
    }

    // Build redirect URL
    let redirectUrl = payment_link;
    if (!redirectUrl && payment_session_id) {
      // Hosted checkout URL format - per Cashfree docs
      redirectUrl = `${CASHFREE_API_BASE}/hosted/payments?payment_session_id=${payment_session_id}`;
    }

    if (!redirectUrl) {
      console.warn('Cashfree response missing redirect URL. Returning session id.');
    }

    return res.status(200).json({
      order_id: orderId,
      redirect_url: redirectUrl || null,
      payment_session_id: payment_session_id || null,
      env: CASHFREE_ENV,
    });
  } catch (error) {
    console.error('Error preparing Cashfree order:', error?.message || error);
    return res.status(500).json({ error: 'Failed to prepare Cashfree order.' });
  }
}
