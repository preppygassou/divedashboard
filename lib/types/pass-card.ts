export interface PassCard {
  id: string;
  cardNumber: string;
  userId: string;
  orderId: string;
  status: 'pending_production' | 'in_production' | 'ready_to_ship' | 'shipped' | 'delivered' | 'activated' | 'expired' | 'cancelled';
  tier: 'dive_plus' | 'dive_ultra' | 'dive_max';
  validFrom: string;
  validUntil: string;
  divesRemaining: number | null;
  trackingNumber?: string;
  user: {
    name: string;
    email: string;
  };
  order: {
    id: string;
    amount: number;
  };
}