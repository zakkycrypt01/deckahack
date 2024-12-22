import React from "react";
import HeroImage from '../assets/images/hero-image.png';
import { FaBolt, FaShield, FaUser } from "react-icons/fa6";

const HeroSection = () => {
  return (
    <section className="bg-base-100 py-20 theme-luxury">
      <div className="container mx-auto px-6 lg:flex lg:items-center lg:justify-between">
        
        {/* Text Section */}
        <div className="lg:w-1/2">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Secure Your Transactions with Trusted Escrow
          </h1>
          <p className="text-xl text-neutral-content mb-8">
            Fast, reliable, and secure. Our escrow service ensures that every transaction is safe and hassle-free.
          </p>
          <div className="flex space-x-4">
            <a href="/register">
            <button className="btn btn-primary px-6 py-3 rounded-lg">
              Get Started
            </button>
            </a>
            <a href="/about">
            <button className="btn btn-outline btn-secondary px-6 py-3 rounded-lg">
              Learn More
            </button>
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <img
            src={HeroImage}
            alt="Secure transactions"
            className="w-full max-w-md mx-auto shadow-lg rounded-lg"
          />
        </div>
      </div>

      {/* Trust Signals Section */}
      <div className="mt-16 text-center">
        <p className="text-neutral-content">
         Be among the first to experience ICPLink – the new frontier of secure cryptocurrency trading!
        </p>
        <p className="text-neutral-content mt-2">
          Join the community embracing the future of P2P  trading!
        </p>
                
        <div className="flex justify-center space-x-4 mt-4 py-8 gap-5">
          <div className="flex flex-col gap-3 text-primary   first-letter: items-center">
            <FaShield size={64}/>
            <p>Security Guaranteed</p>
          </div>
          <div className="flex flex-col gap-3 text-primary   items-center">
            <FaUser size={64}/>
            <p>Community Approved</p>
          </div>
          <div className="flex flex-col gap-3 text-primary   items-center">
            <FaBolt size={64}/>
            <p>Fast Transactions</p>
          </div>
        </div>
        </div>
    </section>
  );
};

export default HeroSection;
