import { prisma } from '../../lib/prisma';
import { PARTICIPANT_STATUS, PAYMENT_STATUS } from './participant.constant';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const createParticipant = async (payload: any) => {
  const { userId, eventId } = payload;

  // Check if participant already exists
  const exists = await prisma.participant.findUnique({
    where: { userId_eventId: { userId, eventId } },
  });
  if (exists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Participant already exists for this event');
  }

  const participant = await prisma.participant.create({
    data: {
      userId,
      eventId,
      status: PARTICIPANT_STATUS.PENDING,
      paymentStatus: PAYMENT_STATUS.PENDING,
    },
  });

  return participant;
};

const getAllParticipants = async () => {
  return await prisma.participant.findMany({
    include: { user: true, event: true },
  });
};

const getSingleParticipant = async (id: string) => {
  const participant = await prisma.participant.findUnique({
    where: { id },
    include: { user: true, event: true },
  });
  if (!participant) throw new AppError(httpStatus.NOT_FOUND, 'Participant not found');
  return participant;
};

const updateParticipantById = async (id: string, payload: any) => {
  const participant = await prisma.participant.update({
    where: { id },
    data: payload,
  });
  return participant;
};

const deleteParticipantById = async (id: string) => {
  await prisma.participant.delete({ where: { id } });
};

export const ParticipantService = {
  createParticipant,
  getAllParticipants,
  getSingleParticipant,
  updateParticipantById,
  deleteParticipantById,
};