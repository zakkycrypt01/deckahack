// src/components/PriceTracker.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const PriceTracker = () => {
  const [cryptos, setCryptos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cryptosPerPage] = useState(20); // Display 20 cryptos per page
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from CoinGecko API
  useEffect(() => {
    const fetchCryptos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets`,
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 100,
              page: 1,
              sparkline: false,
              price_change_percentage: "24h,7d",
            },
          }
        );
        setCryptos(response.data);
      } catch (err) {
        setError("Failed to fetch cryptocurrency data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Filter cryptos based on search query
  const filteredCryptos = cryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination calculations
  const indexOfLastCrypto = currentPage * cryptosPerPage;
  const indexOfFirstCrypto = indexOfLastCrypto - cryptosPerPage;
  const currentCryptos = filteredCryptos.slice(
    indexOfFirstCrypto,
    indexOfLastCrypto
  );
  const totalPages = Math.ceil(filteredCryptos.length / cryptosPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="form-control w-full max-w-md">
          <div className="flex gap-10 input-group">
            <input
              type="text"
              placeholder="Search by name or symbol..."
              className="input input-bordered w-full"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="btn btn-square btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-error shadow-lg mb-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m5-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : (
        <>
          {/* Crypto Table */}
          <div className="overflow-x-auto">
            <table className="table w-full table-zebra">
              <thead>
                <tr>
                  <th></th>
                  <th>Coin</th>
                  <th>Price</th>
                  <th>24h Change</th>
                  <th>7d Change</th>
                  <th>Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {currentCryptos.length > 0 ? (
                  currentCryptos.map((crypto, index) => (
                    <tr key={crypto.id}>
                      <td>{indexOfFirstCrypto + index + 1}</td>
                      <td className="flex items-center space-x-2">
                        <img
                          src={crypto.image}
                          alt={crypto.name}
                          className="w-6 h-6"
                        />
                        <div>
                          <span className="font-semibold">
                            {crypto.name}
                          </span>
                          <br />
                          <span className="text-sm uppercase text-gray-500">
                            {crypto.symbol}
                          </span>
                        </div>
                      </td>
                      <td>${crypto.current_price.toLocaleString()}</td>
                      <td
                        className={
                          crypto.price_change_percentage_24h >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {crypto.price_change_percentage_24h
                          ? crypto.price_change_percentage_24h.toFixed(2)
                          : "0.00"}
                        %
                      </td>
                      <td
                        className={
                          crypto.price_change_percentage_7d_in_currency >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {crypto.price_change_percentage_7d_in_currency
                          ? crypto.price_change_percentage_7d_in_currency.toFixed(2)
                          : "0.00"}
                        %
                      </td>
                      <td>${crypto.market_cap.toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No cryptocurrencies found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-row justify-center mt-6">
              <ul className="flex">
                <li>
                  <button
                    className="btn btn-sm"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, idx) => (
                  <li key={idx}>
                    <button
                      className={`btn btn-sm ${
                        currentPage === idx + 1 ? "btn-active" : ""
                      }`}
                      onClick={() => paginate(idx + 1)}
                    >
                      {idx + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    className="btn btn-sm"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PriceTracker;
