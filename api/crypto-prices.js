import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
    const top10ByVolume = response.data
      .filter(ticker => ticker.symbol.endsWith('USDT'))
      .sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
      .slice(0, 10)
      .map(ticker => ({
        symbol: ticker.symbol,
        price: parseFloat(ticker.lastPrice).toFixed(2),
        priceChangePercent: parseFloat(ticker.priceChangePercent).toFixed(2),
      }));
    res.status(200).json(top10ByVolume);
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    res.status(500).json({ error: 'Failed to fetch crypto prices' });
  }
}
