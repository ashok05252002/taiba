export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  prescriptionRequired: boolean;
  inStock: boolean;
  rating: number;
  description: string;
  dosage?: string;
  tags?: string[];
  keyFeatures: string[];
  benefits: string[];
  activeIngredients: { name: string; benefit: string; }[];
  directionsForUse: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderStatus {
  id: string;
  status: 'confirmed' | 'packed' | 'out-for-delivery' | 'delivered';
  timestamp: string;
  location?: string;
}
