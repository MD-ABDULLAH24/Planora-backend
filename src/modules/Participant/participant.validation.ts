import { z } from 'zod';

export const createParticipantValidationSchema = z.object({
  body: z.object({
    userId: z.string(),
    eventId: z.string(),
  }),
});

export const updateParticipantValidationSchema = z.object({
  body: z.object({
    status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'BANNED']).optional(),
    paymentStatus: z.enum(['PENDING', 'PAID', 'FAILED']).optional(),
  }),
});

export const ParticipantValidations = {
  createParticipantValidationSchema,
  updateParticipantValidationSchema,
};