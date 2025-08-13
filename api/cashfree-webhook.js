const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

// Initialize Supabase client
// IMPORTANT: Replace with your actual Supabase URL and anon key
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// IMPORTANT: Replace with your actual Cashfree Webhook Secret
// This should be stored securely, e.g., in environment variables
const CASHFREE_WEBHOOK_SECRET = process.env.CASHFREE_WEBHOOK_SECRET;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const payload = req.body;
  const signature = req.headers['x-webhook-signature'];

  if (!signature) {
    return res.status(400).send('Webhook signature missing');
  }

  // Verify webhook signature
  const hmac = crypto.createHmac('sha256', CASHFREE_WEBHOOK_SECRET);
  hmac.update(JSON.stringify(payload));
  const expectedSignature = hmac.digest('base64');

  if (signature !== expectedSignature) {
    console.warn('Webhook signature mismatch:', { received: signature, expected: expectedSignature });
    return res.status(403).send('Invalid webhook signature');
  }

  console.log('Received Cashfree webhook:', payload);

  try {
    // Check payment status
    // Cashfree webhook payload structure might vary, adjust as needed
    const paymentStatus = payload.data.payment.payment_status;
    const customerEmail = payload.data.customer_details.customer_email;

    if (paymentStatus === 'SUCCESS' && customerEmail) {
      const { data, error } = await supabase
        .from('subscriptions') // Replace 'subscription' with your actual table name
        .insert([{ email: customerEmail }]);

      if (error) {
        console.error('Error inserting email into Supabase:', error);
        return res.status(500).json({ error: 'Failed to insert email' });
      }

      console.log('Email successfully added to Supabase:', customerEmail);
      return res.status(200).json({ message: 'Webhook processed successfully' });
    } else {
      console.log('Payment not successful or email missing, not adding to Supabase.');
      return res.status(200).json({ message: 'Payment not successful or email missing' });
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
