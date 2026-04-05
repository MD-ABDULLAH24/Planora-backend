import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidations } from './review.validation';
import { USER_ROLE } from '../User/user.utils';

const router = express.Router();

// CREATE
router.post(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(ReviewValidations.createReviewValidationSchema),
  ReviewController.createReview
);

// GET ALL
router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  ReviewController.getReviews
);

// GET SINGLE
router.get(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  ReviewController.getSingleReview
);

// UPDATE
router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(ReviewValidations.updateReviewValidationSchema),
  ReviewController.updateReview
);

// DELETE
router.delete(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  ReviewController.deleteReview
);

export const ReviewRoutes = router;