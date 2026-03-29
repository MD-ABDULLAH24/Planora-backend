import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().nonempty('Email is required.').email('Invalid email.'),
    password: z.string().nonempty('Password is required.'),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string().nonempty('Refresh token is required!'),
  }),
});

export const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Name is required.'),
    email: z.string().nonempty('Email is required.').email('Invalid email.'),
    password: z.string().nonempty('Password is required.'),
    img: z.string().optional(),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  refreshTokenValidationSchema,
  registerUserValidationSchema,
};