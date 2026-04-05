import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { EventController } from './event.controller';
import { EventValidations } from './event.validation';
import { USER_ROLE } from '../User/user.utils';

const router = express.Router();

// CREATE
router.post(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(EventValidations.createEventValidationSchema),
  EventController.createEvent
);

// GET ALL
router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  EventController.getAllEvents
);

// GET SINGLE
router.get(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  EventController.getSingleEvent
);

// UPDATE
router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(EventValidations.updateEventValidationSchema),
  EventController.updateEvent
);

// DELETE
router.delete(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  EventController.deleteEvent
);

export const EventRoutes = router;