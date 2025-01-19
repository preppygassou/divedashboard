import { z } from 'zod';

export const passCardSchema = z.object({
  id: z.string().optional(),
  cardNumber: z.string().optional(),
  userId: z.string().optional(),
  orderId: z.string(),
  status: z.enum(['pending_production', 'in_production', 'ready_to_ship', 'shipped', 'delivered', 'activated', 'expired', 'cancelled','pending']).optional(),
  tier: z.enum(['plus', 'ultra', 'max']),
  validFrom: z.string(),
  validUntil: z.string(),
  divesRemaining: z.number().nullable().optional(),
  trackingNumber: z.string().optional().optional(),
});