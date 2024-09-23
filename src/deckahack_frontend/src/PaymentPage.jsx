import { useState, useEffect } from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'

export default function PaymentPage() {
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h1 className="text-xl font-semibold mb-4">Pay Merchant</h1>
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold">₦100,000</h2>
              <p className="text-sm text-gray-500">Pay Crypto Lurd in</p>
              <div className="text-4xl font-mono bg-gray-200 p-2 rounded-md inline-block mt-2">
                {formatTime(timeLeft)}
              </div>
            </div>
            <ul className="text-sm space-y-2">
              <li>• Proceed to your bank app or payment platform and send the required amount to the bank account details below.</li>
              <li>• After completing the payment, come back to the Norva app and click confirm payment to notify the seller.</li>
            </ul>
            <div className="space-y-2">
              <p className="text-sm"><span className="font-semibold">Account Name:</span> Ademola Michael</p>
              <p className="text-sm"><span className="font-semibold">Account Number:</span> 0000000000</p>
              <p className="text-sm"><span className="font-semibold">Bank:</span> Norva Bank</p>
            </div>
            <div className="bg-red-100 p-3 rounded-md flex items-start">
              <FaExclamationTriangle className="text-red-600 mr-2 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-red-600 font-semibold">Important</p>
                <p className="text-xs text-red-600">Please note: payment should be made in Naira. Do not send any crypto (BTC, BNB, ETH, USDT, Norva etc.) to the narration when making payment.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-between">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  )
}