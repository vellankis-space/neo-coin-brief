const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import cors

const app = express();
const PORT = process.env.PORT || 3001;

// Use cors middleware
app.use(cors());

const retry = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && (error.response?.status === 429 || error.code === 'ERR_BAD_REQUEST')) {
      console.warn(`Retrying after ${delay}ms... Attempts left: ${retries}`);
      await new Promise(res => setTimeout(res, delay));
      return retry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

app.get('/api/crypto-prices', async (req, res) => {
  try {
    const response = await retry(async () => {
      return await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    });

    const top10ByVolume = response.data.map(coin => ({
      symbol: coin.symbol.toUpperCase() + '/USD',
      price: coin.current_price.toFixed(2),
      priceChangePercent: coin.price_change_percentage_24h.toFixed(2),
    }));
    res.status(200).json(top10ByVolume);
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    res.status(500).json({ error: 'Failed to fetch crypto prices' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
