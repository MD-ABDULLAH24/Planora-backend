import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import { createToken, verifyToken } from "./auth.utils";

// ================= TYPES =================
export type TLoginUser = {
  email: string;
  password: string;
};

export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
};

// ================= REGISTER =================
const registerUser = async (payload: TRegisterUser) => {
  const { name, email, password } = payload;

  // check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new AppError(httpStatus.CONFLICT, "User already exists!");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  // create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "USER", // default role
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
};

// ================= LOGIN =================
const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials!");
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as string, // keep as string: "7d"
  );

  return {
    accessToken,
    refreshToken,
  };
};

// ================= REFRESH TOKEN =================
const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Refresh token not found!");
  }

  const decoded = verifyToken(token, config.jwt_refresh_secret) as {
    id: string;
    email: string;
    role: string;
  };

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  const newAccessToken = createToken(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    config.jwt_access_secret,
    config.jwt_access_expires_in as string,
  );

  return { accessToken: newAccessToken };
};

// ================= EXPORT =================
export const AuthServices = {
  registerUser,
  loginUser,
  refreshToken,
};
