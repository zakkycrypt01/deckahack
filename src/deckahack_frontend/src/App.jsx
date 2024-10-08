// import { useState } from 'react';
// import { deckahack_backend } from 'declarations/deckahack_backend';

// function App() {
//   const [greeting, setGreeting] = useState('');

//   function handleSubmit(event) {
//     event.preventDefault();
//     const name = event.target.elements.name.value;
//     deckahack_backend.greet(name).then((greeting) => {
//       setGreeting(greeting);
//     });
//     return false;
//   }

//   return (
//     <main>
//       <img src="/logo2.svg" alt="DFINITY logo" />
//       <br />
//       <br />
//       <form action="#" onSubmit={handleSubmit}>
//         <label htmlFor="name">Enter your name: &nbsp;</label>
//         <input id="name" alt="Name" type="text" />
//         <button type="submit">Click Me!</button>
//       </form>
//       <section id="greeting">{greeting}</section>
//     </main>
//   );
// }

// export default App;
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroSection from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Marketplace from './components/Marketplace';
import Footer from './components/Footer';
import Profile from './components/Profile';
import { WalletProvider } from './components/WalletContext';
import Dashboard from './components/Dashboard';
import Features from './components/homeContent/Features';
import PriceTrackerHome from './components/homeContent/PriceTrackerHome';
import MerchantPage from './components/Pages/MerchantPage';
import PaymentPage from './components/Pages/PaymentPage';
import SignUpPage from './components/Pages/SignUp';
import BuyPage from './components/Pages/BuyPage';
import TransactionDetails from './components/Pages/TransactinDetails';
import SellPage from './components/Pages/SellPage';
import TransactionPage from './components/Pages/TransactionPage';

function App() {
  return (
    <WalletProvider>
          <div className="flex justify-center items-center flex-col overflow-hidden sm:px-10 px-5">
      
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={
          <div>
            <HeroSection />
            <Features />
            <PriceTrackerHome />
          </div>  } />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/marketplace" element={<Marketplace/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/merchant" element={<MerchantPage />} />
          <Route path="/pay" element={<PaymentPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/buy" element={<BuyPage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/transaction-details" element={<TransactionDetails />} />
          <Route path="/transaction" element={<TransactionPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      
   </div>
    </WalletProvider>
  );
}

export default App;
