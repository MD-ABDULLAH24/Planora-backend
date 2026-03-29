import { NextFunction, Request, Response } from 'express';
import { ZodTypeAny } from 'zod';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: ZodTypeAny) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const parsed = (await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    })) as { body: unknown; cookies: unknown };

    req.body = parsed.body as any;
    req.cookies = parsed.cookies as any;

    next();
  });
};

export default validateRequest;