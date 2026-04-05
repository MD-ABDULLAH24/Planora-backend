import { z } from 'zod';

// CREATE
export const createEventValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(), // later convert to Date in service
    time: z.string(),
    venue: z.string(),
    eventType: z.enum(['PUBLIC', 'PRIVATE']),
    fee: z.number().optional(),
    avgRating: z.number().optional(),
  }),
});

// UPDATE
export const updateEventValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    date: z.string().optional(),
    time: z.string().optional(),
    venue: z.string().optional(),
    eventType: z.enum(['PUBLIC', 'PRIVATE']).optional(),
    fee: z.number().optional(),
    avgRating: z.number().optional(),
  }),
});

export const EventValidations = {
  createEventValidationSchema,
  updateEventValidationSchema,
};