import { z } from 'zod';

// ================= CREATE USER =================
export const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Name is required'),

    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email'),

    password: z
      .string()
      .min(1, 'Password is required'),

    role: z.enum(['ADMIN', 'USER']).optional(), // ✅ uppercase
  }),
});

// ================= UPDATE USER =================
export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),

    email: z.string().email('Invalid email').optional(),

    password: z.string().optional(),

    role: z.enum(['ADMIN', 'USER']).optional(),
  }),
});

// ================= EXPORT =================
export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};