import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { AuthNavItems, NavItems } from '../data/data';
import { useWallet } from "./WalletContext";

const Footer = () => {
  const { walletConnected } = useWallet();
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="flex flex-col items-center bg-base-100 mb-0 py-8">
      <div className="flexcontainer mx-auto text-center">
        {/* Social Media Links */}
        <div className="flex justify-center space-x-8 mb-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-xl text-primary hover:text-secondary">
            <FaGithub />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl text-primary hover:text-secondary">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xl text-primary hover:text-secondary">
            <FaLinkedin />
          </a>
        </div>

        {/* Navigation Links */}
        <nav>
        <div className="mb-6">
          <ul className="flex justify-center space-x-6">
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
        </nav>

        <div className="bg-base-100 p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold text-center mb-2">Subscribe to Our Newsletter</h2>
      <form className="flex justify-center items-center">
        <input
          type="email"
          placeholder="Enter your email"
          className="input input-bordered mr-2 w-1/2"
          required
        />
        <button type="submit" className="btn btn-primary">
          Subscribe
        </button>
      </form>
      <p className="text-sm text-center mt-2 text-neutral-content">
        Stay updated with the latest news and offers!
      </p>
        </div>

        {/* Back to Top Button */}
        <div className="mb-6">
          <button onClick={scrollToTop} className="btn btn-outline btn-primary">
            Back to Top
          </button>
        </div>
      </div>
   {/* Copyright */}
     <div className="text-neutral-content">
          &copy; {new Date().getFullYear()} ICPLink. All Rights Reserved.
        </div>
    </footer>
  );
};

export default Footer;
