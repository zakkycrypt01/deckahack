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
import "@nfid/identitykit/react/styles.css"
 
import { IdentityKitProvider } from "@nfid/identitykit/react"
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from './Signuppage';
import Merchantspage from './Merchantspage';
import Profilepage from './Profilepage';
import Paymentpage from './PaymentPage';
import Welcome from './Welcome';
import SellPage from "./SellPage";
import BuyPage from "./BuyPage";

export default function App() {
  return (
    <IdentityKitProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/merchants" element={<Merchantspage />} />
          <Route path="/profile" element={<Profilepage />} />
          <Route path="/payment" element={<Paymentpage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/buy" element={<BuyPage />} />
        </Routes>
    </BrowserRouter>
    </IdentityKitProvider>
    
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);