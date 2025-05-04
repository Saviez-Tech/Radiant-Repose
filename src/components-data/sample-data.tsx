import { ProductType } from "@/enums";
import { Product } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";

export const sampleTransactions: Transaction[] = [
  {
    id: '1',
    quantity: 23,
    barCode: '#5302002',
    name: 'Louis Vuitton Bag',
    image: '/images/static/bag1.png',
    piecesLeft: 20,
    price: 34000,
    time: '02:23 am',
    date: '2025-03-20',
    amount: 'N2530',
    category: "luxury-collection",
    productType: ProductType.BAGS,
    balance: 'N30'
  },
  {
    id: '2',
    quantity: 23,
    barCode: '#5302002',
    name: 'Creed Aventus',
    image: '/images/watch.png',
    piecesLeft: 20,
    price: 34000,
    time: '02:23 am',
    date: '2025-02-10',
    amount: 'N2530',
    category: "luxury-collection",
    productType: ProductType.PERFUMES,
    balance: 'N30'
  },
  {
    id: '3',
    quantity: 23,
    barCode: '#5302002',
    name: 'Diamond Rings',
    image: '/images/watch.png',
    piecesLeft: 20,
    price: 34000,
    time: '02:23 am',
    date: '2025-04-21',
    amount: 'N2530',
    category: "luxury-collection",
    productType: ProductType.JEWELRY,
    balance: 'N30'
  },
  {
    id: '4',
    quantity: 23,
    barCode: '#5302002',
    name: 'Vee\'s Heels',
    image: '/images/watch.png',
    piecesLeft: 20,
    price: 34000,
    time: '02:23 am',
    date: '2025-04-21',
    amount: 'N2530',
    category: "luxury-collection",
    productType: ProductType.SHOES,
    balance: 'N30'
  },
  {
    id: '5',
    quantity: 23,
    barCode: '#5302002',
    name: 'Richard Mille',
    image: '/images/watch.png',
    piecesLeft: 20,
    price: 34000,
    time: '02:23 am',
    date: '2025-04-10',
    amount: 'N2530',
    category: "luxury-collection",
    productType: ProductType.JEWELRY,
    balance: 'N30'
  },
  {
    id: '6',
    quantity: 23,
    barCode: '#5302002',
    name: 'Wedding Gown',
    image: '/images/static/bag2.png',
    piecesLeft: 20,
    price: 34000,
    time: '02:23 am',
    date: '2025-04-20',
    amount: 'N2530',
    category: "luxury-collection",
    productType: ProductType.BAGS,
    balance: 'N30'
  },
  {
    id: '7',
    quantity: 23,
    barCode: '#5302002',
    name: 'Hermes Bracelet',
    image: '/images/watch.png',
    piecesLeft: 20,
    price: 34000,
    time: '02:23 am',
    date: '2025-04-15',
    amount: 'N2530',
    category: "luxury-collection",
    productType: ProductType.JEWELRY,
    balance: 'N30'
  },
  // Add more sample data as needed to test pagination
  ...Array.from({ length: 50 }, (_, i) => {
    const start = new Date('2025-04-20')
    const end = new Date('2025-04-21')
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const formattedDate = randomDate.toISOString().split('T')[0]
    
    // Assign random product types for the generated products
    const productTypes = [ProductType.BAGS, ProductType.SHOES, ProductType.JEWELRY, ProductType.PERFUMES];
    const randomProductType = productTypes[Math.floor(Math.random() * productTypes.length)]
    
    return {
      id: `${i + 8}`,
      quantity: Math.floor(Math.random() * 30),
      barCode: '#5302002',
      name: `Product ${i + 8}`,
      image: '/images/watch.png',
      piecesLeft: 20,
      price: 34000,
      time: '02:23 am',
      date: formattedDate,
      amount: 'N2530',
      category: "spa-section" as const,
      productType: randomProductType,
      balance: 'N30'
    };
  })
]


export const sampleAdminTransactions = [
  {
    id: '1',
    quantity: 23,
    barCode: '#5302002',
    name: 'Louis Vuitton Bag',
    image: '/images/static/bag1.png',
    piecesLeft: 20,
    price: 34000,
    time: '02:23 am',
    date: '2025-03-20',
    amount: 'N2530',
    category: "luxury-collection",
    productType: ProductType.BAGS,
    staff: { name: "Jennifer Norman"}
  },
  {
    id: '2',
    quantity: 23,
    barCode: '#5302002',
    name: 'Creed Aventus',
    image: '/images/watch.png',
    piecesLeft: 20,
    price: 34000,
    time: '02:23 am',
    date: '2025-02-10',
    amount: 'N2530',
    category: "luxury-collection",
    productType: ProductType.PERFUMES,
    staff: { name: "Jennifer Norman"}
  },
  {
    id: '3',
    quantity: 23,
    barCode: '#5302002',
    name: 'Diamond Rings',
    image: '/images/watch.png',
    piecesLeft: 20,
    price: 34000,
    time: '02:23 am',
    date: '2025-04-21',
    amount: 'N2530',
    category: "luxury-collection",
    productType: ProductType.JEWELRY,
    staff: { name: "Jennifer Norman"}
  },
  {
    id: '4',
    quantity: 23,
    barCode: '#5302002',
    name: 'Vee\'s Heels',
    image: '/images/watch.png',
    piecesLeft: 20,
    price: 34000,
    time: '02:23 am',
    date: '2025-04-21',
    amount: 'N2530',
    category: "luxury-collection",
    productType: ProductType.SHOES,
    staff: { name: "Jennifer Norman"}
  },
  {
    id: '5',
    quantity: 23,
    barCode: '#5302002',
    name: 'Richard Mille',
    image: '/images/watch.png',
    piecesLeft: 20,
    price: 34000,
    time: '02:23 am',
    date: '2025-04-10',
    amount: 'N2530',
    category: "luxury-collection",
    productType: ProductType.JEWELRY,
    staff: { name: "Jennifer Norman"}
  },
  {
    id: '6',
    quantity: 23,
    barCode: '#5302002',
    name: 'Wedding Gown',
    image: '/images/static/bag2.png',
    piecesLeft: 20,
    price: 34000,
    time: '02:23 am',
    date: '2025-04-20',
    amount: 'N2530',
    category: "luxury-collection",
    productType: ProductType.BAGS,
    staff: { name: "Jennifer Norman"}
  },
  {
    id: '7',
    quantity: 23,
    barCode: '#5302002',
    name: 'Hermes Bracelet',
    image: '/images/watch.png',
    piecesLeft: 20,
    price: 34000,
    time: '02:23 am',
    date: '2025-04-15',
    amount: 'N2530',
    category: "luxury-collection",
    productType: ProductType.JEWELRY,
    staff: { name: "Jennifer Norman"}
  },
  // Add more sample data as needed to test pagination
  ...Array.from({ length: 50 }, (_, i) => {
    const start = new Date('2025-04-20')
    const end = new Date('2025-04-21')
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const formattedDate = randomDate.toISOString().split('T')[0]
    
    // Assign random product types for the generated products
    const productTypes = [ProductType.BAGS, ProductType.SHOES, ProductType.JEWELRY, ProductType.PERFUMES];
    const randomProductType = productTypes[Math.floor(Math.random() * productTypes.length)]
    
    return {
      id: `${i + 8}`,
      quantity: Math.floor(Math.random() * 30),
      barCode: '#5302002',
      name: `Product ${i + 8}`,
      image: '/images/watch.png',
      piecesLeft: 20,
      price: 34000,
      time: '02:23 am',
      date: formattedDate,
      amount: 'N2530',
      category: "spa-section" as const,
      staff: { name: "Jennifer Norman"},
      productType: randomProductType,
    }
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
    productType: ProductType.PERFUMES,
  },
  {
    id: Math.random().toString(36).slice(2, 9),
    barCode: '#5302003',
    name: 'Chanel Classic Flap',
    image: '/images/static/bag1.png',
    piecesLeft: 15,
    price: 9500,
    amount: '₦9,500',
    desc: '100% natural fiber',
    category: "spa-section" as const,
    productType: ProductType.BAGS,
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
    productType: ProductType.PERFUMES
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
    productType: ProductType.PERFUMES,
  },
  {
    id: Math.random().toString(36).slice(2, 9),
    barCode: '#5302006',
    name: 'Hermès Birkin',
    image: '/images/static/bag2.png',
    piecesLeft: 30,
    price: 2500,
    amount: '₦2,500',
    desc: 'Diamond Encrusted, Size 8',
    category: "pharmacy" as const,
    productType: ProductType.BAGS,
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
    productType: ProductType.JEWELRY,
  }
]







export const sampleStaffData: Staff[] = [
  {
    id: "1",
    name: "Amaka Bianca",
    staffId: "RR5302002",
    phoneNumber: "09087654321",
    storeLocation: "Varoyal Plaza, Owerri",
    status: "Active",
    avatar: "/images/demo-user1.png",
    regDate: "2025-04-28T08:30:00Z"
  },
  {
    id: "2",
    name: "Bekoxxi Tasha",
    staffId: "RR5302003",
    phoneNumber: "09087654321",
    storeLocation: "Aba, Abia State",
    status: "Inactive",
    avatar: "/images/demo-user1.png",
    regDate: "2025-04-28T14:15:00Z"
  },
  {
    id: "3",
    name: "Callum Okoronkwo",
    staffId: "RR5302004",
    phoneNumber: "09087654321",
    storeLocation: "Ikoyi, Lagos State",
    status: "Active",
    avatar: "/images/demo-user1.png",
    regDate: "2025-04-27T09:45:00Z"
  },
  {
    id: "4",
    name: "Destiny Franklin",
    staffId: "RR5302005",
    phoneNumber: "09087654321",
    storeLocation: "Owerri",
    status: "Active",
    avatar: "/images/demo-user1.png",
    regDate: "2025-04-05T11:20:00Z"
  },
  {
    id: "5",
    name: "Emmanuel Favour",
    staffId: "RR5302006",
    phoneNumber: "09087654321",
    storeLocation: "Owerri",
    status: "Active",
    avatar: "/images/demo-user1.png",
    regDate: "2025-03-20T10:05:00Z" // last month
  },
  {
    id: "6",
    name: "Femi Akintayo",
    staffId: "RR5302007",
    phoneNumber: "09087654321",
    storeLocation: "Owerri",
    status: "Active",
    avatar: "/images/demo-user1.png",
    regDate: "2024-09-15T16:30:00Z" // last year
  },
  {
    id: "7",
    name: "Gerald Nwamama",
    staffId: "RR5302008",
    phoneNumber: "09087654321",
    storeLocation: "Owerri",
    status: "Active",
    avatar: "/images/demo-user1.png",
    regDate: "2025-04-28T13:45:00Z"
  },
  {
    id: "8",
    name: "Hauwa Musa",
    staffId: "RR5302009",
    phoneNumber: "09087654321",
    storeLocation: "Wuse 2, Abuja",
    status: "Inactive",
    avatar: "/images/demo-user1.png",
    regDate: "2025-03-20T08:15:00Z" // last month
  },
  {
    id: "9",
    name: "Ibukun Adewale",
    staffId: "RR5302010",
    phoneNumber: "09087654321",
    storeLocation: "Ikeja, Lagos",
    status: "Active",
    avatar: "/images/demo-user1.png",
    regDate: "2025-04-27T14:30:00Z"
  },
  {
    id: "10",
    name: "Janet Okoro",
    staffId: "RR5302011",
    phoneNumber: "09087654321",
    storeLocation: "Owerri",
    status: "Active",
    avatar: "/images/demo-user1.png",
    regDate: "2024-09-15T09:20:00Z"
  }
]





export const statuses = [
  {
    status: 'completed' as const,
    value: 12450,
    icon: <Icon icon="octicon:tracked-by-closed-completed-16" width="24" height="24" className="size-7" />
  },
  {
    status: 'ongoing' as const,
    value: 327,
    icon: <Icon icon="ic:outline-pending" width="33" height="33" className="size-8" />
  },
  {
    status: 'cancelled' as const,
    value: 12,
    icon: <Icon icon="icon-park-outline:folder-failed-one" width="24" height="24" className="size-7" />
  }
]



export const demoCartProducts: ScannedProduct[] = [
  {
    id: "1",
    name: "Creed Aventus",
    price: 34000,
    image: "/images/static/bag1.png",
    piecesLeft: 10,
    barCode: "#5302001",
    category: "luxury-collection",
    productType: ProductType.PERFUMES,
    quantity: 2,
    totalPrice: 68000
  },
  {
    id: "2",
    name: "Louis Vuitton Speedy",
    price: 125000,
    image: "/images/static/bag2.png",
    piecesLeft: 3,
    barCode: "#5302002",
    category: "luxury-collection",
    productType: ProductType.BAGS,
    quantity: 1,
    totalPrice: 125000
  },
  {
    id: "3",
    name: "Christian Louboutin Heels",
    price: 85000,
    image: "/images/static/bag3.png",
    piecesLeft: 5,
    barCode: "#5302003",
    category: "luxury-collection",
    productType: ProductType.SHOES,
    quantity: 1,
    totalPrice: 85000
  },
  {
    id: "4",
    name: "Chanel N°5",
    price: 46000,
    image: "/images/static/bag4.png",
    piecesLeft: 8,
    barCode: "#5302004",
    category: "luxury-collection",
    productType: ProductType.PERFUMES,
    quantity: 3,
    totalPrice: 138000
  },
  
]

export const dummyProducts:Product[] = [
  {
    productType: ProductType.BAGS,
    id: "1",
    name:"Chanel Classic Flap",
    price: 34000,
    image_url: "/images/static/bag1.png",
    description: "Diamond Encrusted, Size 8",
    stock_quantity: 20,
  },
  {
    productType: ProductType.BAGS,
    id: "2",
    name:"Prada Saffiano Lux Tote",
    price: 24000,
    image_url: "/images/static/bag2.png",
    description: "100% Leather",
    stock_quantity: 15,
  },
  {
    productType: ProductType.BAGS,
    id: "3",
    name:"Herm s Birkin",
    price: 2500,
    image_url: "/images/static/bag3.png",
    description: "Diamond Encrusted, Size 8",
    stock_quantity: 30,
  },
  {
    productType: ProductType.BAGS,
    id: "4",
    name:"Gucci Bag Marmont",
    price: 95000,
    image_url: "/images/static/bag4.png",
    description: "100% Leather",
    stock_quantity: 4,
  },
  {
    productType: ProductType.BAGS,
    id: "5",
    name:"Louis Vuitton Neverfull MM",
    price: 34000,
    image_url: "/images/static/bag4.png",
    description: "100% Leather",
    stock_quantity: 20,
  },
  {
    productType: ProductType.JEWELRY,
    id: "6",
    name:"Chanel Wallet",
    price: 16000,
    image_url: "/images/static/bag2.png",
    description: "100% Leather",
    stock_quantity: 10,
  },
  {
    productType: ProductType.PERFUMES,
    id: "7",
    name:"Herm s Wallet",
    price: 12000,
    image_url: "/images/static/bag1.png",
    description: "100% Leather",
    stock_quantity: 25,
  },
  {
    productType: ProductType.BAGS,
    id: "8",
    name:"Gucci Wallet",
    price: 10000,
    image_url: "/images/static/bag3.png",
    description: "100% Leather",
    stock_quantity: 15,
  },
  {
    productType: ProductType.BAGS,
    id: "9",
    name:"Prada Wallet",
    price: 8000,
    image_url: "/images/static/bag2.png",
    description: "100% Leather",
    stock_quantity: 20,
  },
  {
    productType: ProductType.BAGS,
    id: "10",
    name:"Louis Vuitton Pochette",
    price: 6000,
    image_url: "/images/static/bag4.png",
    description: "100% Leather",
    stock_quantity: 10,
  },
  {
    productType: ProductType.BAGS,
    id: "11",
    name:"Cartier Wallet",
    price: 4500,
    image_url: "/images/static/bag1.png",
    description: "100% Leather",
    stock_quantity: 20,
  }
]
