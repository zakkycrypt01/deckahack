// src/data/marketplaceData.js
export const coinsForSale = [
    {
      id: 1,
      name: 'ckUSDT',
      price: 1.00,
      range: '100 - 1000',
      user: 'User1',
    },
    {
      id: 2,
      name: 'ckETH',
      price: 2000.00,
      range: '0.1 - 10',
      user: 'User2',
    },
    {
      id: 3,
      name: 'ckBTC',
      price: 30000.00,
      range: '0.01 - 5',
      user: 'User3',
    },
    {
      id: 4,
      name: 'ckUSDC',
      price: 1.00,
      range: '50 - 500',
      user: 'User4',
    },
    {
      id: 5,
      name: 'ckLTC',
      price: 150.00,
      range: '0.5 - 20',
      user: 'User5',
    },
  ];
  
  // Simulating 10 different users
  export const users = Array.from({ length: 10 }, (_, index) => `User${index + 1}`);
  