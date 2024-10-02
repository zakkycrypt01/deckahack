import React from 'react';

const services = [
  {
    title: "Cryptocurrency Listing",
    description: "Easily list your cryptocurrencies for sale with customizable options, including price, location, and payment methods.",
    image: "/cryptocurrency-listing.svg", // Replace with your actual image path
  },
  {
    title: "Secure Escrow",
    description: "Our robust escrow service ensures that funds are held securely until both buyer and seller confirm the transaction, reducing fraud risks.",
    image: "/secure-escrow.svg", // Replace with your actual image path
  },
  {
    title: "User Profile & Ratings",
    description: "Create a detailed user profile and gain trust by building a positive reputation with our rating system after each trade.",
    image: "/user-profile-ratings.svg", // Replace with your actual image path
  },
  {
    title: "Real-time Market Data",
    description: "Get real-time price updates and market data for a range of supported cryptocurrencies, helping you make informed trading decisions.",
    image: "/real-time-market-data.svg", // Replace with your actual image path
  },
  {
    title: "Dispute Resolution",
    description: "Our dispute resolution service helps to mediate any disagreements between buyers and sellers, ensuring fair outcomes for all parties.",
    image: "/dispute-resolution.svg", // Replace with your actual image path
  }
];

const Services = () => {
  return (
    <div className="container mx-auto my-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {services.map((service, index) => (
          <div 
            key={index} 
            className={`bg-base-100 p-6 shadow-lg rounded-lg text-center ${
              index >= 3 ? "lg:col-span-1 lg:mx-auto" : ""}`} // Center bottom 2 on large screens
          >
            <img src={service.image} alt={service.title} className="w-32 h-32 mx-auto mb-6"/>
            <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
            <p className="text-neutral-content">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
