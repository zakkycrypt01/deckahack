import React from "react";
import NewsletterPage from "./NewsLetter";

const About = () => {
  return (
    <section className="bg-base-100 theme-luxury py-16">
      <div className="container mx-auto px-6 text-center">
        
        {/* Project Name */}
        <h1 className="text-4xl font-bold text-primary mb-6">About ICPLink</h1>
        
        {/* Project Description */}
        <p className="text-lg text-neutral-content mb-12">
          ICPLink is a decentralized peer-to-peer (P2P) platform designed to revolutionize cryptocurrency trading. Built on the Internet Computer Protocol (ICP), ICPLink provides a secure, efficient, and user-friendly environment for trading popular cryptocurrencies, including ckUSDT, ckETH, ckBTC, and ckUSDC. With an emphasis on transparency and trust, ICPLink eliminates the need for centralized control, empowering users to engage in safe, real-time transactions.
        </p>

        {/* Problem Statement */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-secondary mb-4">Problem Statement</h2>
          <p className="text-neutral-content">
            The current cryptocurrency ecosystem faces critical challenges such as security vulnerabilities, high fees, and lack of trust in centralized exchanges. Many P2P platforms suffer from inefficiencies, fraud risks, and slow transactions, deterring users from engaging in secure trading. ICPLink addresses these challenges by providing a decentralized solution that enhances security, transparency, and cost-efficiency.
          </p>
        </div>

        {/* Proposed Solution */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-secondary mb-4">Proposed Solution</h2>
          <p className="text-neutral-content">
            Leveraging ICP’s decentralized architecture and reverse gas model, ICPLink enables cost-effective, secure trading of cryptocurrencies. Users can create and browse ads, communicate in real-time through a ping system, and rely on an escrow service for added security. The platform fosters trust through a reputation system and decentralized identity verification, ensuring a safe and seamless trading experience.
          </p>
        </div>
    



        {/* Team Members */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-secondary mb-4">Team Members</h2>
          <p className="text-neutral-content">
            The ICPLink project is driven by the vision and expertise of:
          </p>
          <ul className="list-none list-inside text-neutral-content">
            <li>Zakariyah Abdulaleem</li>
            <li>Folorunsho Olugboji</li>
          </ul>
        </div>
      </div>
      <NewsletterPage />
    </section>
  );
};

export default About;
