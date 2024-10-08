import { useState } from 'react'
import { FaDollarSign, FaChevronDown, FaChevronUp, FaExclamationCircle } from 'react-icons/fa'
import { Switch } from 'daisyui'

const TransactionDetails = () => {
  const [expanded, setExpanded] = useState(false)
  const [payWithToken, setPayWithToken] = useState(false)

  const buyData = {
    price: 10577.49,
    paymentMethods: "Visa, Mastercard, Online payment, VTB24",
    seller: "INDACOIN",
    limit: "10 - 10,471 USD",
    balance: 1.00398865,
    commission: 0.00028407,
    rating: 15.028,
    reviews: 787,
    transactions: 480,
    status: "Verified"
  }

  const sellData = {
    price: 10550.00,
    paymentMethods: "Bank Transfer, PayPal, Revolut",
    buyer: "CryptoKing",
    limit: "100 - 50,000 USD",
    balance: 5.12345678,
    commission: 0.00025000,
    rating: 14.975,
    reviews: 652,
    transactions: 395,
    status: "Verified"
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="border-b border-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">BITTEAM</h1>
          <nav className="hidden md:flex space-x-4">
            <button className="btn btn-ghost">Place an ad</button>
            <button className="btn btn-ghost">Buy</button>
            <button className="btn btn-ghost">Sell</button>
            <button className="btn btn-ghost">Rates</button>
            <button className="btn btn-ghost">Exchange</button>
            <button className="btn btn-ghost">Products</button>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="btn btn-ghost btn-square">
              <span className="sr-only">Toggle theme</span>
              <FaExclamationCircle className="w-5 h-5" />
            </button>
            <button className="btn btn-ghost btn-square">
              <span className="sr-only">Notifications</span>
              <FaExclamationCircle className="w-5 h-5" />
            </button>
            <button className="btn btn-ghost btn-square">
              <span className="sr-only">User account</span>
              <FaExclamationCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <div className="tabs">
          <a className="tab tab-lifted" href="#buy">Buy</a>
          <a className="tab tab-lifted" href="#sell">Sell</a>
        </div>
        <div id="buy" className="mt-4">
          <div className="card bg-gray-800 text-gray-100">
            <div className="card-body">
              <h2 className="card-title">
                Buy BTC for {buyData.price} USD using {buyData.paymentMethods}
              </h2>
              <p className="text-gray-400">
                User {buyData.seller} sells BTC with a limit of {buyData.limit}
              </p>
              <div className="form-control">
                <label className="label">How much do you want to buy?</label>
                <div className="flex space-x-4">
                  <div className="relative flex-1">
                    <label className="label">You're sending</label>
                    <input type="text" placeholder="1,000" className="input input-bordered bg-gray-700 text-gray-100 pl-8" />
                    <FaDollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <div className="relative flex-1">
                    <label className="label">You're getting</label>
                    <input type="text" placeholder="0.15" className="input input-bordered bg-gray-700 text-gray-100 pl-8" />
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">₿</span>
                  </div>
                </div>
              </div>
              <div className="form-control flex items-center space-x-2 mt-4">
                <Switch checked={payWithToken} onChange={() => setPayWithToken(!payWithToken)} />
                <label>Payment by BTT token</label>
              </div>
              <button className="btn btn-primary w-full mt-4">Send a transaction request</button>
            </div>
          </div>
        </div>
        <div id="sell" className="mt-4">
          <div className="card bg-gray-800 text-gray-100">
            <div className="card-body">
              <h2 className="card-title">
                Sell BTC for {sellData.price} USD using {sellData.paymentMethods}
              </h2>
              <p className="text-gray-400">
                User {sellData.buyer} buys BTC with a limit of {sellData.limit}
              </p>
              <button className="btn btn-primary w-full mt-4">Initiate sale request</button>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="card bg-gray-800 text-gray-100">
            <div className="card-header cursor-pointer" onClick={() => setExpanded(!expanded)}>
              <div className="flex justify-between items-center">
                <h3>Where to store BTT tokens?</h3>
                {expanded ? <FaChevronUp className="text-gray-400" /> : <FaChevronDown className="text-gray-400" />}
              </div>
            </div>
            {expanded && (
              <div className="card-body">
                <p>BTT tokens can be stored in various wallets that support the Tron network.</p>
                <ul className="list-disc pl-5">
                  <li>TronLink</li>
                  <li>Trust Wallet</li>
                  <li>Ledger</li>
                  <li>Exodus</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default TransactionDetails
