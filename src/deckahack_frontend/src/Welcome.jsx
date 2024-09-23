import React from 'react'
import { FaArrowRight, FaCheck } from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import Signuppage from './Signuppage'

function Welcome() {
  const navigate = useNavigate();
  const handleClickSignUp = () => {
    navigate('/signup');
  }
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-4 bg-white">
        <div className="text-1xl font-bold">ICPLink</div>
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Buy & Sell</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Features</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
        </nav>
        <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-full hover:bg-gray-50" onClick={handleClickSignUp}>
          Get Started
        </button>
      </header>

      <main className="flex-grow">
        <section className="py-20 px-4 bg-gradient-to-r from-blue-100 to-purple-100">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Simple pricing for everybody</h1>
            <p className="text-xl mb-8">
              Get started in your local currency, cryptocurrency or any combination of the two. Join the thousands of users already using the world's leading crypto P2P exchange.
            </p>
            <button className="px-4 py-3 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 inline-flex items-center" onClick={handleClickSignUp}>
              Launch App
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">Standard</h2>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" />
                    <span>Basic escrow services</span>
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" />
                    <span>Support for major cryptocurrencies</span>
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" />
                    <span>24/7 customer support</span>
                  </li>
                </ul>
                <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Choose Standard
                </button>
              </div>
              <div className="bg-white p-8 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">Customized</h2>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" />
                    <span>All Standard features</span>
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" />
                    <span>Custom integration options</span>
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Major Cryptocurrencies</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 font-semibold">Currency</th>
                    <th className="p-4 font-semibold">Price</th>
                    <th className="p-4 font-semibold">Market Cap</th>
                    <th className="p-4 font-semibold">24h Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4">Bitcoin (BTC)</td>
                    <td className="p-4">$34,567.89</td>
                    <td className="p-4">$650.4B</td>
                    <td className="p-4 text-green-500">+2.5%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Ethereum (ETH)</td>
                    <td className="p-4">$2,345.67</td>
                    <td className="p-4">$275.6B</td>
                    <td className="p-4 text-red-500">-1.2%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Binance Coin (BNB)</td>
                    <td className="p-4">$345.67</td>
                    <td className="p-4">$57.8B</td>
                    <td className="p-4 text-green-500">+0.8%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Cardano (ADA)</td>
                    <td className="p-4">$1.23</td>
                    <td className="p-4">$39.2B</td>
                    <td className="p-4 text-red-500">-0.5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300">About Us</a></li>
                <li><a href="#" className="hover:text-gray-300">Careers</a></li>
                <li><a href="#" className="hover:text-gray-300">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300">Escrow Services</a></li>
                <li><a href="#" className="hover:text-gray-300">API</a></li>
                <li><a href="#" className="hover:text-gray-300">Mobile App</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300">Documentation</a></li>
                <li><a href="#" className="hover:text-gray-300">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-300">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-300">Terms of Service</a></li>
                <li><a href="#" className="hover:text-gray-300">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2023 CryptoEscrow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Welcome;