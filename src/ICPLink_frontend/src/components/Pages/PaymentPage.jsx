import { useState, useEffect } from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'

const PaymentPage = () => {
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
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-lg rounded-lg">
        <div className="card-body">
          <h1 className="text-2xl font-semibold mb-4">Pay Merchant</h1>
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-primary">₦100,000</h2>
              <p className="text-sm text-neutral">Pay Crypto Lurd in</p>
              <div className="text-4xl font-mono bg-neutral text-neutral-content p-2 rounded-md inline-block mt-2">
                {formatTime(timeLeft)}
              </div>
            </div>
            <ul className="text-sm space-y-2 list-disc pl-5 text-neutral">
              <li>Proceed to your bank app or payment platform and send the required amount to the bank account details below.</li>
              <li>After completing the payment, come back to the Norva app and click confirm payment to notify the seller.</li>
            </ul>
            <div className="space-y-2 text-neutral">
              <p className="text-sm"><span className="font-semibold">Account Name:</span> Ademola Michael</p>
              <p className="text-sm"><span className="font-semibold">Account Number:</span> 0000000000</p>
              <p className="text-sm"><span className="font-semibold">Bank:</span> Norva Bank</p>
            </div>
            <div className="alert alert-warning shadow-lg">
              <div className="flex items-start">
                <FaExclamationTriangle className="text-warning mr-2 flex-shrink-0" />
                <div>
                  <p className="font-bold">Important</p>
                  <p className="text-sm">
                    Please note: payment should be made in Naira. Do not send any crypto (BTC, BNB, ETH, USDT, Norva etc.) to the narration when making payment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-actions justify-between px-6 py-4 bg-base-300 rounded-b-lg">
          <button className="btn btn-outline btn-secondary">
            Cancel
          </button>
          <button className="btn btn-primary">
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
