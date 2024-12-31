export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: 'ACTIVE'|
  'INACTIVE'|
  'UNCONFIRMED'|
  'SUSPENDED';
  role: 'USER' | 'ADMIN';
  createdAt: string;
  lastLogin: string;
  cardTier?: 'basic' | 'pro' | 'elite';
}