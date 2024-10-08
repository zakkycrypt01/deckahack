// src/components/SellPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
// Import your ICP canister agent
// import yourCanister from "../agents/icpAgent";

const SellPage = () => {
  // State variables for form fields
  const [cryptoList, setCryptoList] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [additionalTerms, setAdditionalTerms] = useState("");

  // State variables for form submission
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch list of cryptocurrencies (could be from CoinGecko or your own API)
  useEffect(() => {
    const fetchCryptos = async () => {
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
            },
          }
        );
        setCryptoList(response.data);
      } catch (error) {
        console.error("Error fetching cryptocurrencies:", error);
      }
    };

    fetchCryptos();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (
      !selectedCrypto ||
      !amount ||
      !price ||
      !paymentMethod
    ) {
      setErrorMessage("Please fill in all required fields.");
      setSuccessMessage("");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    // Prepare data for submission
    const adData = {
      cryptocurrency: selectedCrypto,
      amount: parseFloat(amount),
      price: parseFloat(price),
      paymentMethod,
      additionalTerms,
      // You might want to add user identification, timestamp, etc.
    };

    try {
      // **ICP Integration**:
      // Uncomment and configure the following lines to interact with your ICP canister.
      /*
      await yourCanister.createSellAd(adData);
      setSuccessMessage("Your sell ad has been posted successfully on the blockchain!");
      */

      // **Backend Integration**:
      // If you're using a traditional backend, use the following lines instead.
      const response = await axios.post(
        "https://your-backend-api.com/api/sell-ads",
        adData
      );

      if (response.status === 201) {
        setSuccessMessage("Your sell ad has been posted successfully!");
        // Reset form fields
        setSelectedCrypto("");
        setAmount("");
        setPrice("");
        setPaymentMethod("");
        setAdditionalTerms("");
      } else {
        setErrorMessage("Failed to post your sell ad. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting sell ad:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-base-100 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Sell Your Crypto</h2>

        {/* Success Message */}
        {successMessage && (
          <div className="alert alert-success shadow-lg mb-4">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{successMessage}</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Cryptocurrency Selection */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Select Cryptocurrency</span>
            </label>
            <select
              className="select select-bordered"
              value={selectedCrypto}
              onChange={(e) => setSelectedCrypto(e.target.value)}
              required
            >
              <option value="" disabled>
                Choose a cryptocurrency
              </option>
              {cryptoList.map((crypto) => (
                <option key={crypto.id} value={crypto.id}>
                  {crypto.name} ({crypto.symbol.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Amount to Sell */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Amount to Sell</span>
            </label>
            <input
              type="number"
              step="any"
              min="0"
              className="input input-bordered"
              placeholder="e.g., 0.5"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {/* Price per Unit */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Price per Unit (USD)</span>
            </label>
            <input
              type="number"
              step="any"
              min="0"
              className="input input-bordered"
              placeholder="e.g., 30000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Payment Method */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Payment Method</span>
            </label>
            <select
              className="select select-bordered"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="" disabled>
                Choose a payment method
              </option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="paypal">PayPal</option>
              <option value="crypto_wallet">Crypto Wallet</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Additional Terms/Notes */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Additional Terms/Notes</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              placeholder="Any additional terms or notes..."
              value={additionalTerms}
              onChange={(e) => setAdditionalTerms(e.target.value)}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className={`btn btn-primary ${
                loading ? "loading" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Sell Ad"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellPage;
