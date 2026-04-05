import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import * as ReviewService from "./review.service";
import httpStatus from "http-status";

export const ReviewController = {
  createReview: catchAsync(async (req: Request, res: Response) => {
    const result = await ReviewService.createReview(
      req.body,
      (req as any).user,
    );

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "Review created successfully",
      data: result,
    });
  }),

  getReviews: catchAsync(async (req: Request, res: Response) => {
    const result = await ReviewService.getReviews();

    res.status(httpStatus.OK).json({
      success: true,
      message: "Reviews retrieved successfully",
      data: result,
    });
  }),

  getSingleReview: catchAsync(async (req: Request, res: Response) => {
    const result = await ReviewService.getSingleReview(req.params.id as string);

    res.status(httpStatus.OK).json({
      success: true,
      message: "Review retrieved successfully",
      data: result,
    });
  }),

  updateReview: catchAsync(async (req: Request, res: Response) => {
    const result = await ReviewService.updateReview(
      req.params.id as string,
      req.body,
    );

    res.status(httpStatus.OK).json({
      success: true,
      message: "Review updated successfully",
      data: result,
    });
  }),

  deleteReview: catchAsync(async (req: Request, res: Response) => {
    await ReviewService.deleteReview(req.params.id as string);

    res.status(httpStatus.OK).json({
      success: true,
      message: "Review deleted successfully",
    });
  }),
};
