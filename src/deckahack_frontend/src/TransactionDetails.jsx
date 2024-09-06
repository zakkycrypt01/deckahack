import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, ChevronDown, ChevronUp, DollarSign, Info } from 'lucide-react'

export default function Component() {
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
            <Button variant="ghost">Place an ad</Button>
            <Button variant="ghost">Buy</Button>
            <Button variant="ghost">Sell</Button>
            <Button variant="ghost">Rates</Button>
            <Button variant="ghost">Exchange</Button>
            <Button variant="ghost">Products</Button>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <span className="sr-only">Toggle theme</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            </Button>
            <Button variant="ghost" size="icon">
              <span className="sr-only">Notifications</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            </Button>
            <Button variant="ghost" size="icon">
              <span className="sr-only">User account</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
          </TabsList>
          <TabsContent value="buy">
            <Card className="bg-gray-800 text-gray-100">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Buy BTC for {buyData.price} USD
                  <br />
                  using {buyData.paymentMethods}
                </CardTitle>
                <p className="text-gray-400">
                  User {buyData.seller} sells BTC with a limit of {buyData.limit}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="amount">How much do you want to buy?</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="send-amount">You're sending</Label>
                        <div className="relative">
                          <Input id="send-amount" placeholder="1,000" className="pl-8 bg-gray-700 text-gray-100 border-gray-600" />
                          <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="receive-amount">You're getting</Label>
                        <div className="relative">
                          <Input id="receive-amount" placeholder="0.15" className="pl-8 bg-gray-700 text-gray-100 border-gray-600" />
                          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">₿</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="pay-with-token" checked={payWithToken} onCheckedChange={setPayWithToken} />
                    <Label htmlFor="pay-with-token">Payment by BTT token</Label>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Send a transaction request</Button>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Deal info</h3>
                      <dl className="grid grid-cols-2 gap-1 text-sm">
                        <dt className="text-gray-400">Balance</dt>
                        <dd>{buyData.balance} BTC</dd>
                        <dt className="text-gray-400">Commission</dt>
                        <dd>{buyData.commission} BTC</dd>
                      </dl>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">User info</h3>
                      <dl className="grid grid-cols-2 gap-1 text-sm">
                        <dt className="text-gray-400">User rating</dt>
                        <dd>{buyData.rating}</dd>
                        <dt className="text-gray-400">Reviews</dt>
                        <dd>{buyData.reviews}</dd>
                        <dt className="text-gray-400">Transactions</dt>
                        <dd>{buyData.transactions}</dd>
                        <dt className="text-gray-400">Status</dt>
                        <dd>{buyData.status}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="mt-4 bg-gray-800 text-gray-100">
              <CardHeader className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
                <div className="flex justify-between items-center">
                  <CardTitle>Where to store BTT tokens?</CardTitle>
                  {expanded ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                </div>
              </CardHeader>
              {expanded && (
                <CardContent>
                  <p>
                    BTT tokens can be stored in various cryptocurrency wallets that support the Tron network (TRC10 and TRC20 tokens).
                    Some popular options include:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-gray-300">
                    <li>TronLink (browser extension and mobile app)</li>
                    <li>Trust Wallet (mobile app)</li>
                    <li>Ledger hardware wallets (with Tron app installed)</li>
                    <li>Exodus (desktop and mobile wallet)</li>
                  </ul>
                  <p className="mt-2 text-gray-300">
                    Always ensure you're using official wallet applications and keep your private keys or recovery phrases secure.
                  </p>
                </CardContent>
              )}
            </Card>
          </TabsContent>
          <TabsContent value="sell">
            <Card className="bg-gray-800 text-gray-100">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Sell BTC for {sellData.price} USD
                  <br />
                  using {sellData.paymentMethods}
                </CardTitle>
                <p className="text-gray-400">
                  User {sellData.buyer} buys BTC with a limit of {sellData.limit}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="amount">How much do you want to sell?</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="send-amount">You're sending</Label>
                        <div className="relative">
                          <Input id="send-amount" placeholder="0.15" className="pl-8 bg-gray-700 text-gray-100 border-gray-600" />
                          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">₿</span>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="receive-amount">You're getting</Label>
                        <div className="relative">
                          <Input id="receive-amount" placeholder="1,000" className="pl-8 bg-gray-700 text-gray-100 border-gray-600" />
                          <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Initiate sale request</Button>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Deal info</h3>
                      <dl className="grid grid-cols-2 gap-1 text-sm">
                        <dt className="text-gray-400">Balance</dt>
                        <dd>{sellData.balance} BTC</dd>
                        <dt className="text-gray-400">Commission</dt>
                        <dd>{sellData.commission} BTC</dd>
                      </dl>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">User info</h3>
                      <dl className="grid grid-cols-2 gap-1 text-sm">
                        <dt className="text-gray-400">User rating</dt>
                        <dd>{sellData.rating}</dd>
                        <dt className="text-gray-400">Reviews</dt>
                        <dd>{sellData.reviews}</dd>
                        <dt className="text-gray-400">Transactions</dt>
                        <dd>{sellData.transactions}</dd>
                        <dt className="text-gray-400">Status</dt>
                        <dd>{sellData.status}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="mt-4 bg-gray-800 text-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 text-yellow-300" />
                  Important Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-yellow-300 mb-2">
                  Attention! Do not send funds before accepting the transaction or for any reason. Do not confirm the transaction until you are sure to receive funds.
                </p>
                <p className="text-gray-300">
                  A system for automatic purchase of cryptocurrencies through the payment gateway of service partners.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}