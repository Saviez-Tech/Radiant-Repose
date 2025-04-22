export const sampleTransactions: Transaction[] = [
  {
    id: '1',
    barCode: '#5302002',
    name: 'Louis Vuitton Bag',
    image: '/images/watch.png',
    piecesLeft: 20,
    price: 34000,
    quantity: 3,
    time: '02:23 am',
    date: '2025-03-20',
    amount: 'N2530',
    category: "luxury-collection",
    balance: 'N30'
  },
  {
    id: '2',
    barCode: '#5302002',
    name: 'Creed Aventus',
    image: '/images/watch.png',
    piecesLeft: 20,
    price: 34000,
    quantity: 2,
    time: '02:23 am',
    date: '2025-02-10',
    amount: 'N2530',
    category: "luxury-collection",
    balance: 'N30'
  },
  {
    id: '3',
    barCode: '#5302002',
    name: 'Diamond Rings',
    image: '/images/watch.png',
    piecesLeft: 20,
    price: 34000,
    quantity: 2,
    time: '02:23 am',
    date: '2025-04-21',
    amount: 'N2530',
    category: "luxury-collection",
    balance: 'N30'
  },
  {
    id: '4',
    barCode: '#5302002',
    name: 'Vee\'s Heels',
    image: '/images/watch.png',
    piecesLeft: 20,
    price: 34000,
    quantity: 2,
    time: '02:23 am',
    date: '2025-04-21',
    amount: 'N2530',
    category: "luxury-collection",
    balance: 'N30'
  },
  {
    id: '5',
    barCode: '#5302002',
    name: 'Richard Mille',
    image: '/images/watch.png',
    piecesLeft: 20,
    price: 34000,
    quantity: 2,
    time: '02:23 am',
    date: '2025-04-10',
    amount: 'N2530',
    category: "luxury-collection",
    balance: 'N30'
  },
  {
    id: '6',
    barCode: '#5302002',
    name: 'Wedding Gown',
    image: '/images/watch.png',
    piecesLeft: 20,
    price: 34000,
    quantity: 2,
    time: '02:23 am',
    date: '2025-04-20',
    amount: 'N2530',
    category: "luxury-collection",
    balance: 'N30'
  },
  {
    id: '7',
    barCode: '#5302002',
    name: 'Hermes Bracelet',
    image: '/images/watch.png',
    piecesLeft: 20,
    price: 34000,
    quantity: 2,
    time: '02:23 am',
    date: '2025-04-15',
    amount: 'N2530',
    category: "luxury-collection",
    balance: 'N30'
  },
  // Add more sample data as needed to test pagination
  ...Array.from({ length: 50 }, (_, i) => {
    const start = new Date('2025-04-20')
    const end = new Date('2025-04-21')
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const formattedDate = randomDate.toISOString().split('T')[0]
    
    return {
      id: `${i + 8}`,
      barCode: '#5302002',
      name: `Product ${i + 8}`,
      image: '/images/watch.png',
      piecesLeft: 20,
      price: 34000,
      quantity: Math.floor(Math.random() * 5) + 1,
      time: '02:23 am',
      date: formattedDate,
      amount: 'N2530',
      category: "spa-section" as const,
      balance: 'N30'
    };
  })
]