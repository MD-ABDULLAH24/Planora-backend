import express from 'express';
import { ParticipantController } from './participant.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ParticipantValidations } from './participant.validation';
import { USER_ROLE } from '../User/user.utils';

const router = express.Router();

// CREATE
router.post(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(ParticipantValidations.createParticipantValidationSchema),
  ParticipantController.createParticipant
);

// GET ALL
router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  ParticipantController.getAllParticipants
);

// GET SINGLE
router.get(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  ParticipantController.getSingleParticipant
);

// UPDATE
router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(ParticipantValidations.updateParticipantValidationSchema),
  ParticipantController.updateParticipant
);

// DELETE
router.delete(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  ParticipantController.deleteParticipant
);

export const ParticipantRoutes = router;