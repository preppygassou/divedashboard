export interface Order {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  tier: 'basic' | 'pro' | 'elite';
  amount: number;
  createdAt: string;
  shipping: {
    name: string;
    address: string;
    city: string;
    postcode: string;
    country: string;
  };
}