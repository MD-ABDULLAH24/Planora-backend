import { prisma } from '../../lib/prisma';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

// CREATE REVIEW
export const createReview = async (payload: any, user: any) => {
  const { eventId, rating, comment } = payload;

  // prevent duplicate review
  const existing = await prisma.review.findUnique({
    where: {
      userId_eventId: {
        userId: user.id,
        eventId,
      },
    },
  });

  if (existing) {
    throw new AppError(httpStatus.BAD_REQUEST, 'You already reviewed this event!');
  }

  const review = await prisma.review.create({
    data: {
      eventId,
      rating,
      comment,
      userId: user.id,
    },
  });

  // 🔥 update avgRating
  const reviews = await prisma.review.findMany({
    where: { eventId },
  });

  const avg =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  await prisma.event.update({
    where: { id: eventId },
    data: { avgRating: avg },
  });

  return review;
};

// GET ALL REVIEWS
export const getReviews = async () => {
  return await prisma.review.findMany({
    include: {
      user: true,
      event: true,
    },
  });
};

// GET SINGLE REVIEW
export const getSingleReview = async (id: string) => {
  const review = await prisma.review.findUnique({
    where: { id },
  });

  if (!review) {
    throw new AppError(httpStatus.NOT_FOUND, 'Review not found!');
  }

  return review;
};

// UPDATE REVIEW
export const updateReview = async (id: string, payload: any) => {
  return await prisma.review.update({
    where: { id },
    data: payload,
  });
};

// DELETE REVIEW
export const deleteReview = async (id: string) => {
  return await prisma.review.delete({
    where: { id },
  });
};