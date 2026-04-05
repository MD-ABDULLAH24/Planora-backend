import { z } from 'zod';

// CREATE INVITATION
export const createInvitationValidationSchema = z.object({
  body: z.object({
    eventId: z.string(),
    userId: z.string(),
  }),
});

// UPDATE INVITATION (accept/reject)
export const updateInvitationValidationSchema = z.object({
  body: z.object({
    status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'BANNED']),
  }),
});

export const InvitationValidations = {
  createInvitationValidationSchema,
  updateInvitationValidationSchema,
};