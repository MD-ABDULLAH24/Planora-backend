import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { prisma } from '../lib/prisma';
import { USER_ROLE } from '../modules/User/user.utils';

const auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

   
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    //Bearer remove  
    const actualToken = token.startsWith('Bearer ')
      ? token.split(' ')[1]
      : token;

    //Invalid token  error 
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(
        actualToken,
        config.jwt_access_secret as string
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid token!');
    }

    const { role, email, id } = decoded;

    // user exist check
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
    }

    //role check (if requiredRoles provided)
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.FORBIDDEN, 'Forbidden!');
    }

    // req.user attach (TypeScript safe)
    (req as any).user = {
      id,
      email,
      role,
    };

    next();
  });
};

export default auth;