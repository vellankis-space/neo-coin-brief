import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import axios from 'axios';
import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.post('/api/create-checkout-session', async (req, res) => {
  const { priceId, customerEmail, successUrl, cancelUrl } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      customer_email: customerEmail,
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/crypto-prices', async (req, res) => {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
    // Filter for USDT pairs and sort by quoteVolume (as a proxy for market cap)
    // Note: Binance API does not directly provide market cap. For true market cap ranking,
    // a different API (e.g., CoinGecko, CoinMarketCap) would be required.
    const top10ByVolume = response.data
      .filter(ticker => ticker.symbol.endsWith('USDT'))
      .sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
      .slice(0, 10)
      .map(ticker => ({
        symbol: ticker.symbol,
        price: parseFloat(ticker.lastPrice).toFixed(2),
        priceChangePercent: parseFloat(ticker.priceChangePercent).toFixed(2),
      }));
    res.json(top10ByVolume);
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    res.status(500).json({ error: 'Failed to fetch crypto prices' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});