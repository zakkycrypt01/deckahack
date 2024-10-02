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

const MerchantPage = () => {
  const [activeTab, setActiveTab] = useState('buy')
  const [selectedCurrency, setSelectedCurrency] = useState('BTC')

  return (
    <div className="container mx-auto my-16 px-4">
      <h1 className="text-5xl font-bold text-center mb-12">
        Merchant
      </h1>
      <div className="flex justify-between items-center mb-8">
        <div className="btn-group">
          <button
            className={`btn ${activeTab === 'buy' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('buy')}
          >
            Buy
          </button>
          <button
            className={`btn ${activeTab === 'sell' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('sell')}
          >
            Sell
          </button>
        </div>
        <button className="btn btn-outline">
          <FaFilter size={18} />
        </button>
      </div>

      <div className="flex space-x-4 mb-8">
        <input
          type="text"
          placeholder={activeTab === 'buy' ? "Enter amount to buy" : "Enter amount to sell"}
          className="input input-bordered flex-grow"
        />
        <select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
          className="select select-bordered w-32"
        >
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="USDT">USDT</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {(activeTab === 'buy' ? buyMerchantData : sellMerchantData).map((merchant, index) => (
          <div key={index} className="bg-base-300 p-6 shadow-lg rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <div className="avatar placeholder">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                    <FaUser className="text-xl" />
                  </div>
                </div>
                <span className="text-lg font-semibold">{merchant.name}</span>
              </div>
              <span className="text-xl font-bold">
                ₦{(activeTab === 'buy' ? merchant.amount : merchant.price).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="mb-4">
              <span className="badge badge-outline">Volume: {merchant.volume} BTC</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span>Min: ₦{merchant.min.toLocaleString('en-NG')}</span>
              <span>Max: ₦{merchant.max.toLocaleString('en-NG')}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex space-x-4 text-xs">
                <span>{merchant.trades} Trades</span>
                <span>{merchant.completion}% Completion</span>
                <span>{merchant.responseTime} mins Response</span>
              </div>
              <button className="btn btn-primary btn-sm">
                {activeTab === 'buy' ? 'Buy' : 'Sell'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MerchantPage
