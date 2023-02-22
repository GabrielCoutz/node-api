import { NextFunction, Request, Response } from 'express';

import { ApiError } from './ApiErrors.js';

export const middlewareError = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = error.status ?? 500;
  const message = error.message ?? 'Internal Server Error';

  res.status(status).json({ message });
  next();
};
