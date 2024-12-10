export interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  role: 'user' | 'admin';
  createdAt: string;
  lastLogin: string;
  cardTier?: 'basic' | 'pro' | 'elite';
}