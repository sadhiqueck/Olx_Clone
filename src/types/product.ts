export type CategoryId =
   "cars"
  | "motorcycles"
  | "mobile"
  | "For sale: Houses & Apartments"
  | "Scooter"
  | "Commercial & Other Vehicles"
  | "For rent: Houses & Apartments";

export interface Category {
  id: CategoryId;
  label: string;
}

export interface FormData {
  title: string;
  price: string;
  description: string;
  category: string;
  moreInfo: unknown;
}

export interface ProductIF {
  id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  category: string;
  seller?: {
    name: string;
    joinDate: Date;
    number: string;
  };
  moreInfo: unknown;
}
