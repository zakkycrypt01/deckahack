// src/components/TransactionPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TransactionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { transactionData, type } = location.state || {};

  // If no transaction data is found, display a message and redirect option
  if (!transactionData || !type) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Transaction Data Found</h2>
          <p>Please initiate a transaction from the main page.</p>
          <button className="btn btn-primary mt-4" onClick={() => navigate('/')}>
            Go to Main Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Transaction Details</h1>
          <button className="btn btn-ghost" onClick={() => navigate('/')}>
            Back
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <div className="card bg-gray-800 text-gray-100">
          <div className="card-body">
            <h2 className="card-title">
              {type === 'buy' ? 'Buy' : 'Sell'} BTC Transaction
            </h2>
            <p className="text-gray-400">
              {type === 'buy' ? 'Buyer' : 'Seller'}: {type === 'buy' ? transactionData.seller : transactionData.buyer}
            </p>
            <div className="mt-4">
              <p><strong>Price:</strong> {transactionData.price} USD</p>
              <p><strong>Payment Methods:</strong> {transactionData.paymentMethods}</p>
              <p><strong>Transaction Limit:</strong> {transactionData.limit}</p>
              <p><strong>Commission:</strong> {transactionData.commission} BTC</p>
              <p><strong>Rating:</strong> {transactionData.rating} / 20</p>
              <p><strong>Reviews:</strong> {transactionData.reviews}</p>
              <p><strong>Transactions:</strong> {transactionData.transactions}</p>
              <p><strong>Status:</strong> {transactionData.status}</p>
            </div>
            <button className="btn btn-primary w-full mt-4" onClick={() => alert('Transaction Confirmed')}>
              Confirm Transaction
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransactionPage;
