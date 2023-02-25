import { NextFunction, Request, Response } from 'express';

import { ApiError } from './ApiErrors.js';

interface ResponseCustom {
  statusText: string;
}

export const middlewareError = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response & ResponseCustom,
  next: NextFunction,
) => {
  const status = error.status ?? 500;
  const message = error.message ?? 'Internal Server Error';
  const statusMessage = error.errorName ?? 'Error';
  res.statusText = statusMessage;

  res.status(status).json({ message, statusMessage });
  next();
};
