import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EventService } from './event.service';

// CREATE
const createEvent = catchAsync(async (req: Request, res: Response) => {
  const result = await EventService.createEvent(req.body, (req as any).user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Event created successfully',
    data: result,
  });
});

// GET ALL
const getAllEvents = catchAsync(async (req: Request, res: Response) => {
  const result = await EventService.getAllEvents();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Events retrieved successfully',
    data: result,
  });
});

// GET SINGLE
const getSingleEvent = catchAsync(async (req: Request, res: Response) => {
  const result = await EventService.getSingleEvent(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event retrieved successfully',
    data: result,
  });
});

// UPDATE
const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const result = await EventService.updateEvent(
    req.params.id as string,
    req.body,
    (req as any).user
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event updated successfully',
    data: result,
  });
});

// DELETE
const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  await EventService.deleteEvent(req.params.id as string, (req as any).user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event deleted successfully',
    data: null,
  });
});

export const EventController = {
  createEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};