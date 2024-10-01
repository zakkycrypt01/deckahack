import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack, IoChevronForward } from 'react-icons/io5';
import { FaWifi } from 'react-icons/fa';
import { BsBatteryHalf } from 'react-icons/bs';

export default function BuyPage() {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen p-4">
      
      {/* Header */}
      <div className="flex items-center mb-6">
        <IoArrowBack className="text-2xl" onClick={handleBack}/>
        <h1 className="text-xl font-bold flex-grow text-center">Buy USDT</h1>
      </div>

      {/* Price Info */}
      <div className="mb-6">
        <p className="text-gray-600">Price</p>
        <p className="text-green-600 text-2xl font-bold">1,679 NGN <span className="text-sm text-gray-500">42s</span></p>
      </div>

      {/* Price Alert */}
      <div className="bg-yellow-100 text-yellow-800 p-2 rounded mb-6">
        The price is higher than 5.1% of the reference price.
      </div>

      {/* Transaction Details */}
      <div className="space-y-2 mb-6">
        <p><span className="text-gray-600">Quantity</span> 6.6589 USDT</p>
        <p><span className="text-gray-600">Payment Method</span> Bank Transfer</p>
        <p><span className="text-gray-600">Payment Duration</span> 15Min(s)</p>
      </div>

      {/* Buy Form */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow">
        <div className="flex justify-between mb-4">
          <button className="font-bold border-b-2 border-blue-500 pb-1">With Fiat</button>
          <button className="text-gray-400">With Crypto</button>
        </div>
        <input
          type="text"
          placeholder="Please enter amount"
          className="w-full bg-gray-100 p-2 rounded mb-2"
        />
        <div className="flex justify-between mb-2">
          <span>NGN</span>
          <span className="text-blue-600">All</span>
        </div>
        <p className="text-gray-600 mb-4">I will receive <span className="float-right">-- USDT</span></p>
        <button className="w-full bg-blue-500 text-white font-bold py-2 rounded">
          Buy
        </button>
        <p className="text-gray-500 text-sm mt-2">
          If there is risk, the withdrawal may be delayed by up to 24 hours.
        </p>
      </div>

      {/* Remarks */}
      <div className="mb-6">
        <h2 className="font-bold mb-2">Remarks</h2>
        <p className="text-gray-600 text-sm">
          Pls adhere to the below terms before proceeding to payment.
          1-Don't mark the transaction completed if you haven't make payment
          2-No third party payment, flutterwave etc..
          3-Drop receipt after payment for verification
          4-Am active to release coin upon confirmation
          5-Pls leave a positive review after the transaction
        </p>
      </div>

      {/* Transaction Info */}
      <div>
        <h2 className="font-bold mb-2">Transaction Info</h2>
        <div className="flex justify-between items-center mb-4">
          <span>Seller Nickname</span>
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">puppet</span>
            <span className="text-gray-500 text-sm mr-2">2 h ago</span>
            <IoChevronForward />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="flex justify-between mb-2">
            <span className="text-gray-600">Good Rating %</span>
            <span>92 %</span>
          </p>
          <p className="flex justify-between mb-2">
            <span className="text-gray-600">Completed Order(s) in 30 Days</span>
            <span>165 Order(s)</span>
          </p>
          <p className="flex justify-between mb-2">
            <span className="text-gray-600">30-Day Order Completion Rate (%)</span>
            <span>95 %</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-600">Avg. Release Time</span>
            <span>102 Minute(s)</span>
          </p>
        </div>
      </div>
    </div>
  );
}