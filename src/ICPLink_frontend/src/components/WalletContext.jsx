// WalletContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletConnected, setWalletConnected] = useState(() => {
    // Check localStorage for the wallet connection state
    return localStorage.getItem('walletConnected') === 'true';
  });

  const toggleWalletConnection = () => {
    const newState = !walletConnected;
    setWalletConnected(newState);
    localStorage.setItem('walletConnected', newState); // Save the new state to localStorage
  };

  return (
    <WalletContext.Provider value={{ walletConnected, toggleWalletConnection }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  return useContext(WalletContext);
};
