import React from 'react';
import { Farm, Product, SubscriptionOption } from './types';

export const APP_NAME = "PeakToPlate BC";

// SVG Icons (Heroicons)
export const MapPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

export const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export const CalendarDaysIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-3.75h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
  </svg>
);

export const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const TruckIcon = (props: React.SVGProps<SVGSVGElement>) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
</svg>
);

export const ShoppingCartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

export const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export const MinusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
  </svg>
);

export const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const InformationCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
  </svg>
);

export const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);


// Mock Data
const mockProductsFarm1: Product[] = [
  { id: 'p1', farmId: 'f1', name: 'Feijao preto', price: 5.99, unit: 'bunch', imageUrl: 'https://picsum.photos/seed/carrots/300/200', isAvailable: true, description: "Certified Organic, sweet and crunchy." },
  { id: 'p2', farmId: 'f1', name: 'Large Eggs', price: 7.50, unit: 'dozen', imageUrl: 'https://picsum.photos/seed/eggs/300/200', isAvailable: true, description: "Pasture-raised, rich yolks." },
  { id: 'p3', farmId: 'f1', name: 'Heirloom Tomatoes', price: 6.00, unit: 'lb', imageUrl: 'https://picsum.photos/seed/tomatoes/300/200', isAvailable: false },
  { id: 'p4', farmId: 'f1', name: 'Artisan Sourdough', price: 9.00, unit: 'loaf', imageUrl: 'https://picsum.photos/seed/bread/300/200', isAvailable: true },
];

const mockProductsFarm2: Product[] = [
  { id: 'p5', farmId: 'f2', name: 'Gala Apples', price: 4.00, unit: 'lb', imageUrl: 'https://picsum.photos/seed/apples/300/200', isAvailable: true },
  { id: 'p6', farmId: 'f2', name: 'Raw Honey', price: 12.00, unit: 'jar', imageUrl: 'https://picsum.photos/seed/honey/300/200', isAvailable: true },
  { id: 'p7', farmId: 'f2', name: 'Fresh Goat Cheese', price: 8.50, unit: 'round', imageUrl: 'https://picsum.photos/seed/cheese/300/200', isAvailable: true },
];

const mockProductsFarm3: Product[] = [
  { id: 'p8', farmId: 'f3', name: 'Mixed Flower Bouquet', price: 25.00, unit: 'bouquet', imageUrl: 'https://picsum.photos/seed/flowers/300/200', isAvailable: true },
  { id: 'p9', farmId: 'f3', name: 'Strawberry Jam', price: 7.00, unit: 'jar', imageUrl: 'https://picsum.photos/seed/jam/300/200', isAvailable: true },
];

const mockSubscriptionOptionsFarm1: SubscriptionOption[] = [
    { id: 'sub1-f1', name: 'Small Veggie Box', price: 25, frequency: 'Weekly', description: 'A curated box of seasonal veggies.' },
    { id: 'sub2-f1', name: 'Large Veggie Box', price: 40, frequency: 'Weekly', description: 'More variety and quantity for the whole family.' },
];


export const MOCK_FARMS: Farm[] = [
  {
    id: 'f1',
    name: 'Rafael lopes',
    tagline: 'Organic Veggies & Pastured Eggs',
    location: 'Chilliwack, BC',
    distance: '12 km away',
    heroImage: 'https://picsum.photos/seed/farm1/800/400',
    pickupTimes: 'Thu-Sat, 10am-2pm',
    deliveryInfo: 'Delivery: Wednesdays ($5 fee)',
    story: 'We are a family-run farm dedicated to sustainable agriculture and providing our community with the freshest, healthiest food possible. Our chickens roam freely, and our vegetables are grown without any synthetic pesticides or fertilizers.',
    offersSubscriptions: true,
    products: mockProductsFarm1,
    subscriptionOptions: mockSubscriptionOptionsFarm1,
  },
  {
    id: 'f2',
    name: 'Orchard Blossom Farm',
    tagline: 'Crisp Apples, Sweet Honey & Dairy',
    location: 'Kelowna, BC',
    distance: '3 km away',
    heroImage: 'https://picsum.photos/seed/farm2/800/400',
    pickupTimes: 'Fri-Sun, 11am-4pm',
    story: 'Our orchards have been producing delicious fruit for generations. We also keep happy bees and goats, offering a range of farm-fresh products.',
    offersSubscriptions: false,
    products: mockProductsFarm2,
  },
  {
    id: 'f3',
    name: 'Petal & Stem Homestead',
    tagline: 'Beautiful Flowers & Homemade Goods',
    location: 'Langley, BC',
    distance: '8 km away',
    heroImage: 'https://picsum.photos/seed/farm3/800/400',
    pickupTimes: 'Saturdays, 9am-1pm (Market Pickup)',
    deliveryInfo: 'Local Delivery: Tuesdays ($7 fee)',
    story: 'From vibrant bouquets to delicious homemade jams, we pour love into everything we grow and make. Find us at the local farmers market or order for local delivery.',
    offersSubscriptions: false,
    products: mockProductsFarm3,
  },
];
