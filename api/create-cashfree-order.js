
import express from 'express';

const app = express();
app.use(express.json());

app.post('/api/create-cashfree-order', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    // Create a payment form URL with customer email as a parameter
    // This allows Cashfree to pass the email back in the webhook
    const paymentFormUrl = `https://payments.cashfree.com/forms/twitter-signals?customerEmail=${encodeURIComponent(email)}`;

    res.json({
      redirect_url: paymentFormUrl,
    });

  } catch (error) {
    console.error('Error preparing Cashfree redirection:', error.message);
    res.status(500).json({ error: 'Failed to prepare Cashfree redirection.' });
  }
});

export default app;

