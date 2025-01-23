import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthClient } from "@dfinity/auth-client";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState("");

  useEffect(() => {
    const initAuthClient = async () => {
      const client = await AuthClient.create({
        idleOptions: {
          disableDefaultIdleCallback: true,
          idleTimeout: 1000 * 60 * 30 // 30 minutes
        }
      });
      setAuthClient(client);
      const isAuthed = await client.isAuthenticated();
      setIsAuthenticated(isAuthed);
      setWalletConnected(isAuthed);
      if (isAuthed) {
        const identity = client.getIdentity();
        const userPrincipal = identity.getPrincipal();
        setPrincipal(userPrincipal.toString());
      }
    };
    initAuthClient();
  }, []);

  const login = async () => {
    if (authClient) {
      const internetIdentityUrl = `https://identity.ic0.app`;
      await authClient.login({
        identityProvider: internetIdentityUrl,
        onSuccess: () => {
          setIsAuthenticated(true);
          setWalletConnected(true);
          
          const identity = authClient.getIdentity();
          const userPrincipal = identity.getPrincipal();
          setPrincipal(userPrincipal.toString());
          // console.log("User Principal:", userPrincipal.toString());
        },
      });
    }
  };

  const logout = async () => {
    if (authClient) {
      await authClient.logout();
      setIsAuthenticated(false);
      setWalletConnected(false);
      setPrincipal("");
    }
  };

  return (
    <WalletContext.Provider value={{ walletConnected, isAuthenticated, login, logout, principal, setPrincipal }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  return useContext(WalletContext);
};