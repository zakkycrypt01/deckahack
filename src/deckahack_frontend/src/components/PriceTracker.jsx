import React, { useEffect, useState } from "react";
import axios from "axios";

const cryptoList = [
  { id: "bitcoin", symbol: "BTC" },
  { id: "ethereum", symbol: "ETH" },
  { id: "cardano", symbol: "ADA" },
  { id: "binancecoin", symbol: "BNB" },
  { id: "dogecoin", symbol: "DOGE" },
  { id: "solana", symbol: "SOL" }
];

const PriceTracker = () => {
  const [prices, setPrices] = useState({});

  // Fetching prices from CoinGecko API
  useEffect(() => {
    const fetchPrices = async () => {
      const coinIds = cryptoList.map((coin) => coin.id).join(",");
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd`
        );
        setPrices(response.data);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };
    
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // update every 60 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6 my-8">
      {cryptoList.map((coin) => (
        <div
          key={coin.id}
          className="card w-60 bg-base-100 shadow-lg p-4 border rounded-lg"
        >
          <div className="card-body text-center">
            <h2 className="card-title font-bold text-xl">
              {coin.symbol.toUpperCase()}
            </h2>
            <p className="text-gray-500">({coin.id.charAt(0).toUpperCase() + coin.id.slice(1)})</p>
            <div className="my-4">
              <span className="text-lg font-semibold">
                ${prices[coin.id]?.usd ? prices[coin.id].usd.toFixed(2) : "Loading..."}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PriceTracker;
