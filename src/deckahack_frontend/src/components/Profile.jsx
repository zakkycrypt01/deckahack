// Import relevant dependencies
import React from "react";

const Profile = () => {
  return (
    <div className="bg-base-100 text-neutral-content p-8 min-h-screen">
      {/* Profile Information */}
      <div className="flex flex-col items-center">
        <div className="avatar">
          <div className="w-24 mask mask-squircle">
            <img src="https://via.placeholder.com/150" alt="Profile Avatar" />
          </div>
        </div>
        <h2 className="text-2xl mt-4">Username</h2>
        <p className="text-sm text-gray-500">username@example.com</p>
        <div className="mt-2">
          <span className="text-gray-400">Wallet Address:</span>
          <span className="ml-2 text-gray-300">ckETHxxxx....zzzz</span>
          <button className="btn btn-sm btn-outline btn-accent ml-2">
            Copy
          </button>
        </div>
      </div>

      {/* Escrow Summary */}
      <div className="mt-8">
        <div className="stats shadow-lg bg-forest">
          <div className="stat">
            <div className="stat-title">Active Trades</div>
            <div className="stat-value">3</div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Trade Volume</div>
            <div className="stat-value">10.5 ckETH</div>
          </div>
          <div className="stat">
            <div className="stat-title">Escrow Status</div>
            <div className="stat-value">Verified</div>
          </div>
        </div>
      </div>

      {/* Trade History */}
      <div className="mt-8">
        <h3 className="text-xl mb-4">Trade History</h3>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Trade ID</th>
                <th>Buyer/Seller</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#12345</td>
                <td>buyername</td>
                <td>1.2 ckETH</td>
                <td className="text-green-500">Completed</td>
              </tr>
              <tr>
                <td>#12346</td>
                <td>sellername</td>
                <td>0.5 ckBTC</td>
                <td className="text-red-500">Failed</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Settings */}
      <div className="mt-8">
        <h3 className="text-xl mb-4">Settings</h3>
        <div className="flex flex-col gap-4">
          <button className="btn btn-outline">Change Password</button>
          <button className="btn btn-outline">Notification Settings</button>
          <button className="btn btn-outline">Customize Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
