import { useState } from 'react';
import { AuthNavItems, NavItems } from '../data/data';
import { FaBars, FaMixer } from 'react-icons/fa6';
import { useWallet } from './WalletContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { walletConnected, toggleWalletConnection } = useWallet();
  const navigate = useNavigate();

  const handleWalletConnect = () => {
    if (walletConnected) {
      // If wallet is connected, disconnect it
      toggleWalletConnection(); // This will update the state and localStorage
      navigate('/')
    } else {
      // If wallet is not connected, connect it and navigate
      toggleWalletConnection(); // This simulates a wallet connection
      navigate('/profile'); // Redirect to the profile page
    }
  };

  return (
    <div className="navbar items-center px-5 justify-between gap-8 bg-base-100">
      <div className="text-white text-2xl font-bold">ICPLink</div>
      
      <nav>
        <ul className="list-none hidden text- sm:flex flex-row gap-7">
          {walletConnected 
          ? AuthNavItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.url}
                className={`${
                  item.url === window.location.pathname &&
                  "text-primary border-b-2 border-rounded py-1 border-primary"
                }`}
              >
                {item.title}
              </a>
            </li>
          ))
          : NavItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.url}
                className={`${
                  item.url === window.location.pathname &&
                  "text-primary border-b-2 border-rounded py-1 border-primary"
                }`}
              >
                {item.title}
              </a>
            </li>
          ))
          }
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <div
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? <FaMixer size={28} /> : <FaBars size={28} />}
          </div>

          {/* Mobile Menu */}
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-base-200 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl text-white`}
          >
            <ul className="list-none flex justify-center items-start flex-1 flex-col gap-4">
            {walletConnected 
          ? AuthNavItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.url}
                className={`${
                  item.url === window.location.pathname &&
                  "text-primary border-b-2 border-rounded py-1 border-primary"
                }`}
              >
                {item.title}
              </a>
            </li>
          ))
          : NavItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.url}
                className={`${
                  item.url === window.location.pathname &&
                  "text-primary border-b-2 border-rounded py-1 border-primary"
                }`}
              >
                {item.title}
              </a>
            </li>
          ))
          }
            </ul>
          </div>
        </div>
      </nav>

      {/* Connect Wallet / Wallet Connected Button */}
      <div onClick={handleWalletConnect}>
        {walletConnected ? (
          <a href='/sign-out'>
            <button className="btn btn-secondary">Wallet Connected</button>
          </a>
        ) : (
          <a href='/sign-in'>
            <button className="btn btn-secondary">Connect Wallet</button>
          </a>
        )}
      </div>


    </div>
  );
};

export default Navbar;
