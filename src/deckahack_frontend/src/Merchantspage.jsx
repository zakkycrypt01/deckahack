import { useState } from 'react'
import { FaChevronLeft, FaFilter, FaUser } from 'react-icons/fa'

const buyMerchantData = [
  { name: 'Crypto Buyer', amount: 20000000.00, volume: 0.012, min: 100000, max: 500000, trades: 150, completion: 98, responseTime: 5 },
  { name: 'BTC Enthusiast', amount: 19996989.75, volume: 0.015, min: 50000, max: 1000000, trades: 200, completion: 99, responseTime: 3 },
  { name: 'Digital Coin Pro', amount: 19996987.95, volume: 0.010, min: 200000, max: 800000, trades: 120, completion: 97, responseTime: 7 },
  { name: 'Crypto Master', amount: 19996999.85, volume: 0.018, min: 150000, max: 600000, trades: 180, completion: 98, responseTime: 4 },
  { name: 'Bitcoin Baron', amount: 19997900.50, volume: 0.014, min: 75000, max: 750000, trades: 160, completion: 99, responseTime: 6 },
]

const sellMerchantData = [
  { name: 'Crypto Seller', price: 19500000.00, volume: 0.020, min: 200000, max: 1000000, trades: 180, completion: 97, responseTime: 6 },
  { name: 'BTC Trader', price: 19550000.00, volume: 0.018, min: 100000, max: 800000, trades: 220, completion: 99, responseTime: 4 },
  { name: 'Digital Asset Pro', price: 19480000.00, volume: 0.015, min: 150000, max: 900000, trades: 140, completion: 98, responseTime: 5 },
  { name: 'Crypto Exchange', price: 19520000.00, volume: 0.022, min: 250000, max: 1200000, trades: 200, completion: 98, responseTime: 3 },
  { name: 'Bitcoin Merchant', price: 19490000.00, volume: 0.017, min: 180000, max: 950000, trades: 160, completion: 97, responseTime: 7 },
]

export default function Merchantspage() {
  const [activeTab, setActiveTab] = useState('buy')
  const [selectedCurrency, setSelectedCurrency] = useState('BTC')

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white p-4 flex items-center justify-between">
        <button className="text-gray-600">
          <FaChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold">Merchants</h1>
        <div className="w-6"></div>
      </header>

      <main className="flex-grow p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded ${activeTab === 'buy' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setActiveTab('buy')}
            >
              Buy
            </button>
            <button
              className={`px-4 py-2 rounded ${activeTab === 'sell' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setActiveTab('sell')}
            >
              Sell
            </button>
          </div>
          <button className="p-2 bg-white rounded">
            <FaFilter size={18} />
          </button>
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            placeholder={activeTab === 'buy' ? "Enter amount to buy" : "Enter amount to sell"}
            className="flex-grow p-2 border rounded"
          />
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="w-[100px] p-2 border rounded"
          >
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="USDT">USDT</option>
          </select>
        </div>

        <div className="space-y-4">
          {(activeTab === 'buy' ? buyMerchantData : sellMerchantData).map((merchant, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <FaUser />
                  </div>
                  <span className="font-semibold">{merchant.name}</span>
                </div>
                <span className="text-lg font-bold">
                  ₦{(activeTab === 'buy' ? merchant.amount : merchant.price).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Volume: {merchant.volume} BTC
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Min: ₦{merchant.min.toLocaleString('en-NG')}</span>
                <span>Max: ₦{merchant.max.toLocaleString('en-NG')}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-4 text-xs text-gray-500">
                  <span>{merchant.trades} Trades</span>
                  <span>{merchant.completion}%</span>
                  <span>{merchant.responseTime} mins</span>
                </div>
                <button className={`px-4 py-2 ${activeTab === 'buy' ? 'bg-blue-500' : 'bg-blue-500'} text-white rounded text-sm`}>
                  {activeTab === 'buy' ? 'Buy' : 'Sell'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}