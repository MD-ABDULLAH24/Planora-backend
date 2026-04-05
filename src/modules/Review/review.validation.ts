import { z } from 'zod';

// CREATE
export const createReviewValidationSchema = z.object({
  body: z.object({
    eventId: z.string(),
    rating: z.number().min(1).max(5),
    comment: z.string().optional(),
  }),
});

// UPDATE
export const updateReviewValidationSchema = z.object({
  body: z.object({
    rating: z.number().min(1).max(5).optional(),
    comment: z.string().optional(),
  }),
});

export const ReviewValidations = {
  createReviewValidationSchema,
  updateReviewValidationSchema,
};