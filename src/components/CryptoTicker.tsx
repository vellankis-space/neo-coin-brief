// CryptoTicker component for displaying real-time crypto prices
// TODO: Integrate with CoinMarketCap API for live data
// Current implementation uses mock data with realistic prices

import React, { useState, useEffect } from 'react';

interface CryptoData {
  symbol: string;
  price: string;
  priceChangePercent: string;
}

const TickerContent: React.FC<{ data: CryptoData[] }> = ({ data }) => {
  const formatPrice = (price: string): string => {
    const numPrice = parseFloat(price);
    if (numPrice < 1) {
      return `${numPrice.toFixed(3)}`;
    } else if (numPrice < 100) {
      return `${numPrice.toFixed(2)}`;
    } else {
      return `${numPrice.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
  };

  const formatChange = (change: string): string => {
    const numChange = parseFloat(change);
    const sign = numChange >= 0 ? '+' : '';
    return `${sign}${numChange.toFixed(2)}%`;
  };

  const getChangeColor = (change: string): string => {
    const numChange = parseFloat(change);
    return numChange >= 0 ? 'text-green-500' : 'text-red-500'; // Using generic green/red for now
  };

  return (
    <>
      {data.map((crypto, index) => (
        <div key={`${crypto.symbol}-${index}`} className="flex-shrink-0 flex items-center gap-2 text-sm font-medium px-4">
          <span className="font-semibold">{crypto.symbol}</span>
          <span className="text-gray-600">|</span>
          <span>{formatPrice(crypto.price)}</span>
          <span className={`${getChangeColor(crypto.priceChangePercent)} font-semibold`}>
            {formatChange(crypto.priceChangePercent)}
          </span>
        </div>
      ))}
    </>
  );
};

const CryptoTicker: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await fetch('/api/crypto-prices');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: CryptoData[] = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching crypto prices:", error);
      }
    };

    fetchCryptoPrices();

    const intervalId = setInterval(fetchCryptoPrices, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-12 overflow-hidden backdrop-blur-md bg-white/30 border-b border-white/10 text-gray-800">
      <div className="crypto-marquee flex items-center h-full">
        <>
            <div className="flex-shrink-0 flex items-center">
              <TickerContent data={cryptoData} />
            </div>
            <div className="flex-shrink-0 flex items-center" aria-hidden="true">
              <TickerContent data={cryptoData} />
            </div>
          </>
      </div>
    </div>
  );
};

export default CryptoTicker;
