import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import AppError from '../../errors/AppError';

// ================= LOGIN =================
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);

  const { accessToken, refreshToken } = result;

  // set refresh token in cookie for 7 days
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,           // JS can't access it
    secure: process.env.NODE_ENV === 'production', // only HTTPS in prod
    sameSite: 'lax',          // cross-site request control
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });

  // send access token in response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully!',
    data: {
      accessToken,
    },
  });
});

// ================= REGISTER =================
const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.registerUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully!',
    data: result,
  });
});

// ================= REFRESH TOKEN =================
const refreshAccessToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Refresh token not found!');
  }

  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result, // { accessToken: "..." }
  });
});

// ================= LOGOUT =================
const logoutUser = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie('refreshToken');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged out successfully!',
    data: null,
  });
});

// ================= EXPORT =================
export const AuthControllers = {
  loginUser,
  registerUser,
  refreshAccessToken,
  logoutUser,
};