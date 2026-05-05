export interface Pizza {
  id: string;
  name: string;
  description: string;
  image: string;
  prices: {
    small: number;
    medium: number;
    large: number;
  };
  category: string;
  popular?: boolean;
  allergens?: string[];
}

export type PizzaSize = "small" | "medium" | "large";
export type CrustType = "traditional" | "thin" | "stuffed";
export type DeliveryType = "delivery" | "takeaway";

export interface CartItem {
  pizza: Pizza;
  size: PizzaSize;
  crust: CrustType;
  extras: string[];
  quantity: number;
  price: number;
}

export interface Beverage {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  size?: string;
  category: string;
}

export interface ExtraProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: "starter" | "dessert" | "sauce";
}

export interface SimpleCartItem {
  product: Beverage | ExtraProduct;
  quantity: number;
  price: number;
  type: "beverage" | "extra";
}

export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  openingHours: string;
}