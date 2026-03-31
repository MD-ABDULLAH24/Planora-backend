import config from '../../config';
import { prisma } from '../../lib/prisma';
import { UserSearchableFields } from './user.constant';
import bcrypt from 'bcrypt';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

import { Role } from '../../../generated/prisma/enums';
import { Prisma } from '../../../generated/prisma/client';

export type TUserPayload = {
  name: string;
  email: string;
  password: string;
  role?: Role; // ✅ FIXED (Prisma enum use)
};

// ================= CREATE USER =================
const createUser = async (user: TUserPayload) => {
  const isExist = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (isExist) {
    throw new AppError(httpStatus.CONFLICT, 'User already exists!');
  }

  const hashedPassword = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  const result = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: hashedPassword,
      role: user.role || 'USER', // ✅ FIXED
    },
  });

  const { password, ...safeData } = result;
  return safeData;
};

// ================= GET SINGLE USER =================
const findUserById = async (userId: string) => {
  const result = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const { password, ...safeData } = result;
  return safeData;
};

// ================= GET ALL USERS =================
const getAllUsers = async (query: Record<string, unknown>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const searchTerm = query.searchTerm as string | undefined;
  const sortBy = (query.sortBy as string) || 'createdAt';
  const sortOrder = (query.sortOrder as 'asc' | 'desc') || 'desc';

  const whereConditions: Prisma.UserWhereInput[] = [];

  if (searchTerm) {
    whereConditions.push({
      OR: UserSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const excludeFields = ['searchTerm', 'page', 'limit', 'sortBy', 'sortOrder'];
  const filterData = Object.fromEntries(
    Object.entries(query).filter(([key]) => !excludeFields.includes(key))
  );

  if (Object.keys(filterData).length) {
    whereConditions.push(filterData as Prisma.UserWhereInput);
  }

  const whereClause =
    whereConditions.length > 0 ? { AND: whereConditions } : {};

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    }),
    prisma.user.count({ where: whereClause }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: users,
  };
};

// ================= UPDATE USER =================
const updateUserById = async (
  userId: string,
  payload: Partial<TUserPayload>
) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (payload.password) {
    payload.password = await bcrypt.hash(
      payload.password,
      Number(config.bcrypt_salt_rounds)
    );
  }

  const result = await prisma.user.update({
    where: { id: userId },
    data: payload,
  });

  const { password, ...safeData } = result;
  return safeData;
};

// ================= DELETE USER =================
const deleteUserById = async (userId: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  await prisma.user.delete({
    where: { id: userId },
  });

  return null;
};

// ================= EXPORT =================
export const UserService = {
  createUser,
  findUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
};