import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ParticipantService } from './participant.service';
import httpStatus from 'http-status';

const createParticipant = catchAsync(async (req: Request, res: Response) => {
  const result = await ParticipantService.createParticipant(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Participant created successfully',
    data: result,
  });
});

const getAllParticipants = catchAsync(async (req: Request, res: Response) => {
  const result = await ParticipantService.getAllParticipants();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Participants retrieved successfully',
    data: result,
  });
});

const getSingleParticipant = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ParticipantService.getSingleParticipant(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Participant retrieved successfully',
    data: result,
  });
});

const updateParticipant = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ParticipantService.updateParticipantById(id as string, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Participant updated successfully',
    data: result,
  });
});

const deleteParticipant = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await ParticipantService.deleteParticipantById(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Participant deleted successfully',
    data: null,
  });
});

export const ParticipantController = {
  createParticipant,
  getAllParticipants,
  getSingleParticipant,
  updateParticipant,
  deleteParticipant,
};