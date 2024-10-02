import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack, IoChevronForward } from 'react-icons/io5';
import { FaWifi } from 'react-icons/fa';
import { BsBatteryHalf } from 'react-icons/bs';

const BuyPage = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return (
    <div className="bg-black text-white min-h-screen p-4 font-sans">
      
      {/* Header */}
      <div className="flex items-center mb-6">
        <IoArrowBack className="text-2xl text-gold-500" onClick={handleBack}/>
        <h1 className="text-xl font-bold flex-grow text-center text-gold-400">Buy USDT</h1>
      </div>

      {/* Price Info */}
      <div className="mb-6">
        <p className="text-gray-400">Price</p>
        <p className="text-gold-500 text-2xl font-bold">1,679 NGN <span className="text-sm text-gray-500">42s</span></p>
      </div>

      {/* Price Alert */}
      <div className="bg-gold-100 text-black p-2 rounded mb-6 shadow-lg">
        The price is higher than 5.1% of the reference price.
      </div>

      {/* Transaction Details */}
      <div className="space-y-2 mb-6">
        <p><span className="text-gray-400">Quantity</span> 6.6589 USDT</p>
        <p><span className="text-gray-400">Payment Method</span> Bank Transfer</p>
        <p><span className="text-gray-400">Payment Duration</span> 15Min(s)</p>
      </div>

      {/* Buy Form */}
      <div className="bg-gray-900 rounded-lg p-4 mb-6 shadow-lg">
        <div className="flex justify-between mb-4">
          <button className="font-bold text-white border-b-2 border-gold-500 pb-1">With Fiat</button>
          <button className="text-gray-500">With Crypto</button>
        </div>
        <input
          type="text"
          placeholder="Please enter amount"
          className="w-full bg-gray-800 p-2 rounded mb-2 text-white placeholder-gray-500"
        />
        <div className="flex justify-between mb-2">
          <span>NGN</span>
          <span className="text-gold-500">All</span>
        </div>
        <p className="text-gray-400 mb-4">I will receive <span className="float-right">-- USDT</span></p>
        <button className="w-full bg-gold-500 text-black font-bold py-2 rounded shadow-lg hover:bg-gold-600 transition duration-200">
          Buy
        </button>
        <p className="text-gray-500 text-sm mt-2">
          If there is risk, the withdrawal may be delayed by up to 24 hours.
        </p>
      </div>

      {/* Remarks */}
      <div className="mb-6">
        <h2 className="font-bold text-gold-500 mb-2">Remarks</h2>
        <p className="text-gray-400 text-sm">
          Pls adhere to the below terms before proceeding to payment:
          <br />1-Don't mark the transaction completed if you haven't made payment
          <br />2-No third-party payment, Flutterwave, etc.
          <br />3-Drop receipt after payment for verification
          <br />4-I'm active to release coin upon confirmation
          <br />5-Pls leave a positive review after the transaction
        </p>
      </div>

      {/* Transaction Info */}
      <div>
        <h2 className="font-bold text-gold-500 mb-2">Transaction Info</h2>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-400">Seller Nickname</span>
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">puppet</span>
            <span className="text-gray-400 text-sm mr-2">2 h ago</span>
            <IoChevronForward className="text-gray-400" />
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 shadow-lg">
          <p className="flex justify-between mb-2">
            <span className="text-gray-400">Good Rating %</span>
            <span className="text-white">92%</span>
          </p>
          <p className="flex justify-between mb-2">
            <span className="text-gray-400">Completed Order(s) in 30 Days</span>
            <span className="text-white">165 Order(s)</span>
          </p>
          <p className="flex justify-between mb-2">
            <span className="text-gray-400">30-Day Order Completion Rate (%)</span>
            <span className="text-white">95%</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Avg. Release Time</span>
            <span className="text-white">102 Minute(s)</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default BuyPage;