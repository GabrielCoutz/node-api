import { NextFunction, Request, Response } from 'express';

export const middlewareCors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Allow-Origin-With-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', '*');

  next();
};
