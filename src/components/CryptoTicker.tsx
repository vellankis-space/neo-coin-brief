// CryptoTicker component for displaying real-time crypto prices
// TODO: Integrate with CoinMarketCap API for live data
// Current implementation uses mock data with realistic prices

import React, { useState } from 'react';

interface CryptoData {
  symbol: string;
  price: number;
  change24h: number;
}

// Mock data with realistic crypto prices
const mockCryptoData: CryptoData[] = [
  { symbol: 'BTC', price: 43250.00, change24h: 2.45 },
  { symbol: 'ETH', price: 2580.75, change24h: -1.23 },
  { symbol: 'BNB', price: 315.20, change24h: 0.89 },
  { symbol: 'ADA', price: 0.485, change24h: 3.67 },
  { symbol: 'SOL', price: 98.45, change24h: -0.45 },
  { symbol: 'DOT', price: 7.23, change24h: 1.78 },
  { symbol: 'AVAX', price: 24.56, change24h: -2.34 },
  { symbol: 'MATIC', price: 0.89, change24h: 4.12 },
  { symbol: 'LINK', price: 15.67, change24h: 0.67 },
  { symbol: 'UNI', price: 6.78, change24h: -1.89 },
];

const TickerContent: React.FC<{ data: CryptoData[] }> = ({ data }) => {
  const formatPrice = (price: number): string => {
    if (price < 1) {
      return `${price.toFixed(3)}`;
    } else if (price < 100) {
      return `${price.toFixed(2)}`;
    } else {
      return `${price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
  };

  const formatChange = (change: number): string => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  const getChangeColor = (change: number): string => {
    return change >= 0 ? 'text-crypto-positive' : 'text-crypto-negative';
  };

  return (
    <>
      {data.map((crypto, index) => (
        <div key={`${crypto.symbol}-${index}`} className="flex-shrink-0 flex items-center gap-2 text-sm font-medium px-4">
          <span className="font-semibold">{crypto.symbol}</span>
          <span className="text-gray-300">|</span>
          <span>{formatPrice(crypto.price)}</span>
          <span className={`${getChangeColor(crypto.change24h)} font-semibold`}>
            {formatChange(crypto.change24h)}
          </span>
        </div>
      ))}
    </>
  );
};

const CryptoTicker: React.FC = () => {
  const [cryptoData] = useState<CryptoData[]>(mockCryptoData);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-primary text-white h-12 overflow-hidden">
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
