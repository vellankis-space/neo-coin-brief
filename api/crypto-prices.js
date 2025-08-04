import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
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
}
