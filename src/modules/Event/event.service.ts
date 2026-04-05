import { prisma } from '../../lib/prisma';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createEvent = async (payload: any, user: any) => {
  const result = await prisma.event.create({
    data: {
      ...payload,
      date: new Date(payload.date),
      creatorId: user.id,
    },
  });

  return result;
};

const getAllEvents = async () => {
  return await prisma.event.findMany({
    include: {
      creator: true,
    },
  });
};

const getSingleEvent = async (id: string) => {
  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    throw new AppError(httpStatus.NOT_FOUND, 'Event not found!');
  }

  return event;
};

const updateEvent = async (id: string, payload: any, user: any) => {
  const event = await prisma.event.findUnique({ where: { id } });

  if (!event) {
    throw new AppError(httpStatus.NOT_FOUND, 'Event not found!');
  }

  // 🔥 only admin or owner
  if (user.role !== 'ADMIN' && event.createdAt !== user.id) {
    throw new AppError(httpStatus.FORBIDDEN, 'Forbidden!');
  }

  return await prisma.event.update({
    where: { id },
    data: {
      ...payload,
      date: payload.date ? new Date(payload.date) : undefined,
    },
  });
};

const deleteEvent = async (id: string, user: any) => {
  const event = await prisma.event.findUnique({ where: { id } });

  if (!event) {
    throw new AppError(httpStatus.NOT_FOUND, 'Event not found!');
  }

  if (user.role !== 'ADMIN' && event.createdAt !== user.id) {
    throw new AppError(httpStatus.FORBIDDEN, 'Forbidden!');
  }

  await prisma.event.delete({ where: { id } });

  return null;
};

export const EventService = {
  createEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};