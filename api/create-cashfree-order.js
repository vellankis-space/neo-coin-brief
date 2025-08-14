export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { email } = req.body || {};

    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    // Create a payment form URL with customer email as a parameter.
    // Note: Configure success/failure return URLs in Cashfree dashboard.
    const paymentFormUrl = `https://payments.cashfree.com/forms/twitter-signals?customerEmail=${encodeURIComponent(email)}`;

    return res.status(200).json({ redirect_url: paymentFormUrl });
  } catch (error) {
    console.error('Error preparing Cashfree redirection:', error?.message || error);
    return res.status(500).json({ error: 'Failed to prepare Cashfree redirection.' });
  }
}
