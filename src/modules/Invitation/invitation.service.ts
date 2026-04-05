import { prisma } from "../../lib/prisma";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { INVITATION_STATUS } from "./invitation.constant";
import { RequestStatus } from "../../../generated/prisma/enums";

export const createInvitation = async (payload: any) => {
  const { eventId, userId } = payload;

  // Check duplicate
  const existing = await prisma.invitation.findUnique({
    where: { eventId_userId: { eventId, userId } },
  });

  if (existing) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invitation already exists!");
  }

  return await prisma.invitation.create({
    data: { eventId, userId },
  });
};

export const getInvitations = async () => {
  return await prisma.invitation.findMany({
    include: { event: true, user: true },
  });
};

export const getSingleInvitation = async (id: string) => {
  const invitation = await prisma.invitation.findUnique({
    where: { id },
    include: { event: true, user: true },
  });
  if (!invitation) {
    throw new AppError(httpStatus.NOT_FOUND, "Invitation not found!");
  }
  return invitation;
};

export const updateInvitation = async (id: string, status: string) => {
  if (!Object.values(INVITATION_STATUS).includes(status as any)) {
    throw new Error("Invalid status");
  }

  return await prisma.invitation.update({
    where: { id },
    data: { status: status as RequestStatus },
  });
};

export const deleteInvitation = async (id: string) => {
  return await prisma.invitation.delete({
    where: { id },
  });
};
