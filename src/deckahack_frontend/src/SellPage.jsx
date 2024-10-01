import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack, IoChevronForward } from 'react-icons/io5';
import { FaWifi } from 'react-icons/fa';
import { BsBatteryHalf } from 'react-icons/bs';

export default function SellPage() {  
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen p-4">
      
      {/* Header */}
      <div className="flex items-center mb-6">
        <IoArrowBack className="text-2xl" onClick={handleBack}/>
        <h1 className="text-xl font-bold flex-grow text-center">Sell USDT</h1>
      </div>

      {/* Price Info */}
      <div className="mb-6">
        <p className="text-gray-600">Price</p>
        <p className="text-red-600 text-2xl font-bold">1,693.69 NGN <span className="text-sm text-gray-500">43s</span></p>
      </div>

      {/* Transaction Details */}
      <div className="space-y-2 mb-6">
        <p><span className="text-gray-600">Quantity</span> 44,760.3348 USDT</p>
        <p><span className="text-gray-600">Payment Method</span> Bank Transfer</p>
        <p><span className="text-gray-600">Payment Duration</span> 30Min(s)</p>
      </div>

      {/* Sell Form */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow">
        <div className="flex justify-between mb-4">
          <button className="font-bold border-b-2 border-blue-500 pb-1">With Crypto</button>
          <button className="text-gray-400">With Fiat</button>
        </div>
        <input
          type="text"
          placeholder="Please enter amount"
          className="w-full bg-gray-100 p-2 rounded mb-2"
        />
        <div className="flex justify-between mb-2">
          <span>USDT</span>
          <span className="text-blue-600">All</span>
        </div>
        <p className="text-gray-600 mb-2">I will receive <span className="float-right">-- NGN</span></p>
        <p className="text-gray-600 mb-4">Available for Sale <span className="float-right">0 USDT</span></p>
        <p className="text-gray-600 mb-2">Payment Method</p>
        <select className="w-full bg-gray-100 p-2 rounded mb-4">
          <option>Bank Transfer</option>
        </select>
        <button className="w-full bg-blue-500 text-white font-bold py-2 rounded">
          Sell
        </button>
        <p className="text-gray-500 text-sm mt-2">
          Please wait for the counterparty to make payment. The tokens for this sale will be transferred out of your Funding Account.
        </p>
      </div>

      {/* Remarks */}
      <div className="mb-6">
        <h2 className="font-bold mb-2">Remarks</h2>
        <p className="text-gray-600 text-sm">
          To prevent coin lock for 24 hours , kindly have 1 or 2 completed buy order please and drop your number please , no number no payment, thanks
        </p>
      </div>

      {/* Transaction Info */}
      <div>
        <h2 className="font-bold mb-2">Transaction Info</h2>
        <div className="flex justify-between items-center mb-4">
          <span>Buyer Nickname</span>
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">ovtech</span>
            <span className="text-gray-500 text-sm mr-2">2 m ago</span>
            <IoChevronForward />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="flex justify-between mb-2">
            <span className="text-gray-600">Good Rating %</span>
            <span>68 %</span>
          </p>
          <p className="flex justify-between mb-2">
            <span className="text-gray-600">Completed Order(s) in 30 Days</span>
            <span>608 Order(s)</span>
          </p>
          <p className="flex justify-between mb-2">
            <span className="text-gray-600">30-Day Order Completion Rate (%)</span>
            <span>96 %</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-600">Avg. Payment Time</span>
            <span>11 Minute(s)</span>
          </p>
        </div>
      </div>
    </div>
  );
}