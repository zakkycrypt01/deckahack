// src/components/MerchantPage.jsx
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaFilter, FaUser, FaSearch, FaSort } from 'react-icons/fa';
import axios from 'axios';

const buyMerchantData = [
  { name: 'Crypto Buyer', rate: 20000000.00, volume: 0.012, min: 100000, max: 500000, trades: 150, completion: 98, responseTime: 5 },
  { name: 'BTC Enthusiast', rate: 19996989.75, volume: 0.015, min: 50000, max: 1000000, trades: 200, completion: 99, responseTime: 3 },
  { name: 'Digital Coin Pro', rate: 19996987.95, volume: 0.010, min: 200000, max: 800000, trades: 120, completion: 97, responseTime: 7 },
  { name: 'Crypto Master', rate: 19996999.85, volume: 0.018, min: 150000, max: 600000, trades: 180, completion: 98, responseTime: 4 },
  { name: 'Bitcoin Baron', rate: 19997900.50, volume: 0.014, min: 75000, max: 750000, trades: 160, completion: 99, responseTime: 6 },
];

const sellMerchantData = [
  { name: 'Crypto Seller', rate: 19500000.00, volume: 0.020, min: 200000, max: 1000000, trades: 180, completion: 97, responseTime: 6 },
  { name: 'BTC Trader', rate: 19550000.00, volume: 0.018, min: 100000, max: 800000, trades: 220, completion: 99, responseTime: 4 },
  { name: 'Digital Asset Pro', rate: 19480000.00, volume: 0.015, min: 150000, max: 900000, trades: 140, completion: 98, responseTime: 5 },
  { name: 'Crypto Exchange', rate: 19520000.00, volume: 0.022, min: 250000, max: 1200000, trades: 200, completion: 98, responseTime: 3 },
  { name: 'Bitcoin Merchant', rate: 19490000.00, volume: 0.017, min: 180000, max: 950000, trades: 160, completion: 97, responseTime: 7 },
];

const MerchantPage = () => {
  const [activeTab, setActiveTab] = useState('buy');
  const [selectedCurrency, setSelectedCurrency] = useState('BTC');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMerchants, setFilteredMerchants] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    volume: '',
    completion: '',
    responseTime: '',
  });
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const merchantsPerPage = 4;

  // Fetch merchants data (simulate fetching from an API)
  useEffect(() => {
    const data = activeTab === 'buy' ? buyMerchantData : sellMerchantData;
    setFilteredMerchants(data);
    setSearchQuery('');
    setFilters({
      volume: '',
      completion: '',
      responseTime: '',
    });
    setSortConfig({ key: '', direction: '' });
    setCurrentPage(1);
  }, [activeTab]);

  // Handle Search, Filters, and Sorting
  useEffect(() => {
    let data = activeTab === 'buy' ? buyMerchantData : sellMerchantData;

    // Apply Search Query
    if (searchQuery) {
      data = data.filter(merchant =>
        merchant.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply Filters
    if (filters.volume) {
      data = data.filter(merchant => merchant.volume >= parseFloat(filters.volume));
    }
    if (filters.completion) {
      data = data.filter(merchant => merchant.completion >= parseInt(filters.completion));
    }
    if (filters.responseTime) {
      data = data.filter(merchant => merchant.responseTime <= parseInt(filters.responseTime));
    }

    // Apply Sorting
    if (sortConfig.key) {
      data = [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredMerchants(data);
    setCurrentPage(1);
  }, [searchQuery, filters, sortConfig, activeTab]);

  // Pagination Logic
  const indexOfLastMerchant = currentPage * merchantsPerPage;
  const indexOfFirstMerchant = indexOfLastMerchant - merchantsPerPage;
  const currentMerchants = filteredMerchants.slice(indexOfFirstMerchant, indexOfLastMerchant);
  const totalPages = Math.ceil(filteredMerchants.length / merchantsPerPage);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort />;
    if (sortConfig.direction === 'ascending') return <FaSort className="transform rotate-180" />;
    return <FaSort />;
  };

  return (
    <div className="container mx-auto my-16 px-4">
      {/* Page Title */}
      <h1 className="text-5xl font-bold text-center mb-12">Merchant</h1>

      {/* Tabs and Filter Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        {/* Tabs */}
        <div className="btn-group mb-4 md:mb-0">
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

        {/* Filter Button */}
        <button
          className="btn btn-outline flex items-center"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <FaFilter className="mr-2" />
          Filter
        </button>
      </div>

      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="bg-base-200 p-4 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Filter Merchants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Volume Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Minimum Volume (BTC)</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.001"
                placeholder="e.g., 0.01"
                className="input input-bordered"
                value={filters.volume}
                onChange={(e) => setFilters({ ...filters, volume: e.target.value })}
              />
            </div>

            {/* Completion Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Minimum Completion (%)</span>
              </label>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="e.g., 95"
                className="input input-bordered"
                value={filters.completion}
                onChange={(e) => setFilters({ ...filters, completion: e.target.value })}
              />
            </div>

            {/* Response Time Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Maximum Response Time (mins)</span>
              </label>
              <input
                type="number"
                min="0"
                placeholder="e.g., 5"
                className="input input-bordered"
                value={filters.responseTime}
                onChange={(e) => setFilters({ ...filters, responseTime: e.target.value })}
              />
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="flex justify-end mt-4">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() =>
                setFilters({
                  volume: '',
                  completion: '',
                  responseTime: '',
                })
              }
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        {/* Search Bar */}
        <div className="flex items-center mb-4 md:mb-0">
          <FaSearch className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by merchant name..."
            className="input input-bordered w-full max-w-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-4">
          <span className="font-medium">Sort By:</span>
          <button
            className="btn btn-ghost btn-sm flex items-center"
            onClick={() => handleSort('volume')}
          >
            Volume {getSortIcon('volume')}
          </button>
          <button
            className="btn btn-ghost btn-sm flex items-center"
            onClick={() => handleSort('trades')}
          >
            Trades {getSortIcon('trades')}
          </button>
          <button
            className="btn btn-ghost btn-sm flex items-center"
            onClick={() => handleSort('completion')}
          >
            Completion {getSortIcon('completion')}
          </button>
          <button
            className="btn btn-ghost btn-sm flex items-center"
            onClick={() => handleSort('responseTime')}
          >
            Response Time {getSortIcon('responseTime')}
          </button>
        </div>
      </div>

      {/* Amount and Currency Selection */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
        <input
          type="number"
          min="0"
          step="any"
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
          {/* Add more currencies as needed */}
        </select>
      </div>

      {/* Merchants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {currentMerchants.length > 0 ? (
          currentMerchants.map((merchant, index) => (
            <div key={index} className="bg-base-300 p-6 shadow-lg rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                  <div className="avatar placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-12 h-12 flex items-center justify-center">
                      <FaUser className="text-xl" />
                    </div>
                  </div>
                  <span className="text-lg font-semibold">{merchant.name}</span>
                </div>
                <span className="text-xl font-bold">
                  ₦{merchant.rate.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="mb-4">
                <span className="badge badge-outline">
                  Volume: {merchant.volume} BTC
                </span>
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
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 text-center text-gray-500">
            No merchants found matching your criteria.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <ul className="btn-group">
            <li>
              <button
                className={`btn btn-sm ${currentPage === 1 ? 'btn-disabled' : 'btn-primary'}`}
                onClick={() => setCurrentPage(prev => prev - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, idx) => (
              <li key={idx}>
                <button
                  className={`btn btn-sm ${currentPage === idx + 1 ? 'btn-active' : 'btn-primary'}`}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                className={`btn btn-sm ${currentPage === totalPages ? 'btn-disabled' : 'btn-primary'}`}
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MerchantPage;
