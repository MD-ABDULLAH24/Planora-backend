import express from 'express';
import { InvitationController } from './invitation.controller';
import { InvitationValidations } from './invitation.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.utils';

const router = express.Router();

// CREATE
router.post(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(InvitationValidations.createInvitationValidationSchema),
  InvitationController.createInvitation
);

// GET ALL
router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  InvitationController.getInvitations
);

// GET SINGLE
router.get(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  InvitationController.getSingleInvitation
);

// UPDATE
router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(InvitationValidations.updateInvitationValidationSchema),
  InvitationController.updateInvitation
);

// DELETE
router.delete(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  InvitationController.deleteInvitation
);

export const InvitationRoutes = router;