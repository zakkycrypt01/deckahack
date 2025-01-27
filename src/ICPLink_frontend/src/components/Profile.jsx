import React, { useEffect } from "react";
import {useWallet} from "./WalletContext";
import { Principal } from '@dfinity/principal';


const Profile = () => {
  const { principal, newAuthActor } = useWallet();
const address = principal?.toString() || 'Address';
console.log('Address:', address, 'Type:', typeof address);

const [userData, setUserData] = React.useState(null);

const fetchUserData = React.useCallback(async () => {
  try {
    if (newAuthActor && address !== 'Address') {
      const principalId = Principal.fromText(address);
      const data = await newAuthActor.getProfileByPrincipal(principalId);
      console.log(data);
      setUserData(data[0]);
    }
  } catch (error) {
    console.log('Error fetching user data:', error);
  }
}, [newAuthActor, address]);

useEffect(() => {
  fetchUserData();
}, [fetchUserData]);

const username = userData?.name || 'Username';
const useremail = userData?.email || 'email';

const truncatePrincipalId = (id) => {
  if (id.length > 10) {
    return `${id.slice(0, 5)}...${id.slice(-5)}`;
  }
  return id;
}
  

  return (
    <div className="bg-base-100 text-neutral-content p-8 min-h-screen">
      {/* Profile Information */}
      <div className="flex flex-col items-center">
        <div className="avatar">
          <div className="w-24 mask mask-squircle">
            <img src="https://via.placeholder.com/150" alt="Profile Avatar" />
          </div>
        </div>
        <h2 className="text-2xl mt-4">{username}</h2>
        <p className="text-sm text-gray-500">{useremail}</p>
        <div className="mt-2">
          <span className="text-gray-400">Wallet Address:</span>
          <span className="ml-2 text-gray-300">{truncatePrincipalId(address)}</span>
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
