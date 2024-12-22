import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthClient } from "@dfinity/auth-client";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState(null);

  useEffect(() => {
    const initAuthClient = async () => {
      const client = await AuthClient.create();
      setAuthClient(client);
      const isAuthed = await client.isAuthenticated();
      setIsAuthenticated(isAuthed);
      setWalletConnected(isAuthed);
      if (isAuthed) {
        const identity = client.getIdentity();
        const userPrincipal = identity.getPrincipal();
        setPrincipal(userPrincipal);
        console.log("User Principal:", userPrincipal.toString());
      }
    };
    initAuthClient();
  }, []);

  const login = async () => {
    if (authClient) {
      const network = process.env.DFX_NETWORK || "local";
      const internetIdentityUrl = network === "local" 
        ? `http://localhost:4943/?canisterId=${process.env.CANISTER_ID_INTERNET_IDENTITY}` 
        : `https://identity.ic0.app`;

      await authClient.login({
        identityProvider: internetIdentityUrl,
        onSuccess: () => {
          setIsAuthenticated(true);
          setWalletConnected(true);
          
          const identity = authClient.getIdentity();
          const userPrincipal = identity.getPrincipal();
          setPrincipal(userPrincipal);
          console.log("User Principal:", userPrincipal.toString());
        },
      });
    }
  };

  const logout = async () => {
    if (authClient) {
      await authClient.logout();
      setIsAuthenticated(false);
      setWalletConnected(false);
      setPrincipal(null);
    }
  };

  return (
    <WalletContext.Provider value={{ walletConnected, isAuthenticated, login, logout, principal }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  return useContext(WalletContext);
};