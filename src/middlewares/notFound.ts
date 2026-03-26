import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
   res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API not found",
    error: "Not Found",
  });
};

export default notFoundHandler;
