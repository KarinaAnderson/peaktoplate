
export interface Farm {
  id: string;
  name: string;
  tagline: string;
  location: string; // e.g., "Kelowna, BC"
  distance: string; // e.g., "5 km away"
  heroImage: string;
  pickupTimes: string;
  deliveryInfo?: string;
  story?: string;
  offersSubscriptions: boolean;
  products: Product[];
  subscriptionOptions?: SubscriptionOption[];
}

export interface Product {
  id: string;
  farmId: string;
  name: string;
  price: number;
  unit: string; // "bunch", "dozen", "lb", "kg", "item"
  imageUrl: string;
  isAvailable: boolean;
  description?: string; // Micro-description
}

export interface SubscriptionOption {
  id: string;
  name: string; // e.g., "Small Veggie Box"
  price: number;
  frequency: "Weekly" | "Bi-weekly";
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryMethod: "pickup" | "delivery" | "subscription";
  deliveryTime?: string; // For pickup/delivery
  subscriptionFrequency?: "Weekly" | "Bi-weekly"; // For subscription
  customerName: string; // Simplified
  confirmationDate: string;
}

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}
