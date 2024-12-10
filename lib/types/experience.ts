export interface Experience {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  capacity: number;
  availableSpots: number;
  imageUrl?: string;
  allowedTiers: ('dive_plus' | 'dive_ultra' | 'dive_max')[];
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
  bookings?: ExperienceBooking[];
}

export interface ExperienceBooking {
  id: string;
  experienceId: string;
  passCardId: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
  experience?: Experience;
  passCard?: {
    cardNumber: string;
    tier: string;
    user: {
      name: string;
      email: string;
    };
  };
}