export const sampleTransactions: Transaction[] = [
  {
    id: '1',
    barCode: '#5302002',
    name: 'Louis Vuitton Bag',
    image: '/images/watch.png',
    piecesLeft: 20,
    price: 34000,
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
      time: '02:23 am',
      date: formattedDate,
      amount: 'N2530',
      category: "spa-section" as const,
      balance: 'N30'
    };
  })
]



export const sampleAdminproducts = [
  {
    id: Math.random().toString(36).slice(2, 9),
    barCode: '#5302002',
    name: 'Creed Aventus',
    image: '/images/watch.png',
    piecesLeft: 20,
    price: 34000,
    amount: '₦25,300',
    desc: '6 Inches, Cream Colour, Size 38',
    category: "luxury-collection" as const,
  },
  {
    id: Math.random().toString(36).slice(2, 9),
    barCode: '#5302003',
    name: 'Luxury Spa Towel',
    image: '/images/watch.png',
    piecesLeft: 15,
    price: 9500,
    amount: '₦9,500',
    desc: 'Soft cotton towel, 100% natural fiber',
    category: "spa-section" as const,
  },
  {
    id: Math.random().toString(36).slice(2, 9),
    barCode: '#5302004',
    name: 'Dettol Antiseptic',
    image: '/images/watch.png',
    piecesLeft: 50,
    price: 1200,
    amount: '₦1,200',
    desc: '500ml Disinfectant Solution',
    category: "pharmacy" as const,
  },
  {
    id: Math.random().toString(36).slice(2, 9),
    barCode: '#5302005',
    name: 'Luxury Fragrance Candle',
    image: '/images/watch.png',
    piecesLeft: 12,
    price: 8000,
    amount: '₦8,000',
    desc: 'Sandalwood & Vanilla Scent, 200g',
    category: "luxury-collection" as const,
  },
  {
    id: Math.random().toString(36).slice(2, 9),
    barCode: '#5302006',
    name: 'Vitamin C Tablets',
    image: '/images/watch.png',
    piecesLeft: 30,
    price: 2500,
    amount: '₦2,500',
    desc: '1000mg tablets, Pack of 60',
    category: "pharmacy" as const,
  },
  {
    id: Math.random().toString(36).slice(2, 9),
    barCode: '#5302007',
    name: 'Essential Oil Diffuser',
    image: '/images/watch.png',
    piecesLeft: 18,
    price: 10500,
    amount: '₦10,500',
    desc: '100ml capacity, USB powered',
    category: "spa-section" as const,
  }
]