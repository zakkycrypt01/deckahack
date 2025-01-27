import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthClient } from "@dfinity/auth-client";
import { idlFactory } from '../../../declarations/ICPLink_backend/ICPLink_backend.did.js';
import { Actor, HttpAgent } from '@dfinity/agent';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState("");
  const [identity, setIdentity] = useState(null);
  const [newAuthActor, setAuthActor] = useState(null);
  
  const days = BigInt(1);
  const hours = BigInt(24);
  const nanoSeconds = BigInt(3600000000000);

  const defaultOptions = {
    createOptions: {
      idleOptions: {
        disableIdle: true,
      },
    },
    loginOptions: {
      identityProvider: `https://identity.ic0.app`,
      maxTimeToLive: days * hours * nanoSeconds,
    },
  };

  useEffect(() => {
    initAuth();
  }, []);

  async function initAuth() {
    try {
      const client = await AuthClient.create(defaultOptions.createOptions);
      setAuthClient(client);
      if (await client.isAuthenticated()) {
        handleAuthenticated(client);
      }
    } catch (error) {
      console.error("Authentication error", error);
    }
  }

  async function handleAuthenticated(client) {
    try {
      const identity = await client.getIdentity();
      console.log('identity :>> ', identity);
      setIdentity(identity);
      setIsAuthenticated(true);

      const principal = identity.getPrincipal();
      const principalIdFull = principal.toString();
      setPrincipal(principalIdFull);

      const agent = new HttpAgent({ identity });
      // Remove this line in production
      if (process.env.NODE_ENV !== 'production') {
        await agent.fetchRootKey().catch(console.error);
      }
      const newAuthActor = Actor.createActor(idlFactory, {
        agent,
        canisterId: process.env.CANISTER_ID_ICPLINK_BACKEND,
      });
      console.log('newAuthActor :>> ', newAuthActor);
      setAuthActor(newAuthActor);
    } catch (error) {
      console.error('Error getting identity:', error);
    }
  }

  async function login() {
    try {
      await authClient.login({
        ...defaultOptions.loginOptions,
        onSuccess: async () => {
          handleAuthenticated(authClient);
        },
      });
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  async function logout() {
    try {
      await authClient.logout();
      setIdentity(null);
      setAuthActor(null);
      setIsAuthenticated(false);
      setPrincipal("");
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  return (
    <WalletContext.Provider value={{ isAuthenticated, login, logout, principal, newAuthActor ,identity }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  return useContext(WalletContext);
};