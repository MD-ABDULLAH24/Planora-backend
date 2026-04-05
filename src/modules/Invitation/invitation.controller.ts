import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { InvitationValidations } from './invitation.validation';
import * as InvitationService from './invitation.service';
import httpStatus from 'http-status';

export const InvitationController = {
  createInvitation: catchAsync(async (req: Request, res: Response) => {
    const invitation = await InvitationService.createInvitation(req.body);
    res.status(httpStatus.CREATED).json({
      success: true,
      message: 'Invitation created successfully',
      data: invitation,
    });
  }),

  getInvitations: catchAsync(async (req: Request, res: Response) => {
    const invitations = await InvitationService.getInvitations();
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Invitations retrieved successfully',
      data: invitations,
    });
  }),

  getSingleInvitation: catchAsync(async (req: Request, res: Response) => {
    const invitation = await InvitationService.getSingleInvitation(req.params.id as string);
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Invitation retrieved successfully',
      data: invitation,
    });
  }),

  updateInvitation: catchAsync(async (req: Request, res: Response) => {
    const invitation = await InvitationService.updateInvitation(req.params.id as string, req.body.status);
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Invitation updated successfully',
      data: invitation,
    });
  }),

  deleteInvitation: catchAsync(async (req: Request, res: Response) => {
    await InvitationService.deleteInvitation(req.params.id as string);
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Invitation deleted successfully',
    });
  }),
};