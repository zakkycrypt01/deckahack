import React from 'react';
import RepImage from '../../assets/images/user-rep.png';
import UiImage from '../../assets/images/ui.png';
import TxnImage from '../../assets/images/transactions.png';
import TradingImage from '../../assets/images/trading.png';
import EscrowImage from '../../assets/images/escrow.png';

const features = [
  {
    title: "Decentralized Trading",
    description: "Trade cryptocurrencies directly between peers without the need for a middleman, ensuring privacy and control over your assets.",
    image: TradingImage, // Replace with your actual image path
  },
  {
    title: "Real-time Transactions",
    description: "Experience fast, secure, and real-time cryptocurrency transactions, minimizing delays and ensuring a smooth trading experience.",
    image: TxnImage, // Replace with your actual image path
  },
  {
    title: "Robust Escrow Services",
    description: "Our escrow service holds funds until both parties confirm the transaction, adding an extra layer of security to your trades.",
    image: EscrowImage, // Replace with your actual image path
  },
  {
    title: "User-friendly Interface",
    description: "Navigate the platform with ease using our intuitive interface, designed to make trading simple for both new and experienced users.",
    image: UiImage, // Replace with your actual image path
  },
  {
    title: "Comprehensive Reputation System",
    description: "Build trust with our reputation system, where users can rate and review their trading experience after every transaction.",
    image: RepImage, // Replace with your actual image path
  }
];

const Features = () => {
  return (
    <div className="container mx-auto my-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Platform Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <div key={index} className="bg-base-100 p-6 shadow-lg rounded-lg text-center">
            <img src={feature.image} alt={feature.title} className="w-128 h-98 mx-auto mb-6"/>
            <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
            <p className="text-neutral-content">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
