import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

// ================= AUTH ROUTES =================

// Register
router.post(
  '/register',
  validateRequest(AuthValidation.registerUserValidationSchema),
  AuthControllers.registerUser
);

// Login
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);

// Refresh Token
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshAccessToken
);

// Logout
router.post('/logout', AuthControllers.logoutUser);

export const AuthRoutes = router;