export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  prescriptionRequired: boolean;
  inStock: boolean;
  stock: number;
  rating: number;
  description: string;
  dosage?: string;
  tags?: string[];
  keyFeatures: string[];
  benefits: string[];
  activeIngredients: { name: string; benefit: string; }[];
  directionsForUse: string;
  expiryDate: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderActivity {
  status: string;
  timestamp: string;
  location?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Cancelled' | 'Shipped' | 'Out for Delivery';
  total: string;
  items: CartItem[];
  activityLog: OrderActivity[];
  shippingAddress: string;
  paymentMethod: string;
}

export interface RefundRequest {
    id: string;
    orderId: string;
    date: string;
    productName: string;
    amount: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    reason: string;
}
