import { Request } from 'express';
import jwt from 'jsonwebtoken';

import { UnauthorizedError } from '../../../helpers/ApiErrors.js';
import { cookieParser } from './cookieParser.js';

interface IToken {
  id: string;
}

const verifyJwtToken = (token: string): string | undefined => {
  try {
    const { id } = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as IToken;

    return id;
  } catch {
    return;
  }
};

export const generateToken = (payload: string): string =>
  jwt.sign({ id: payload }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });

export const getIdFromHttpCookie = (req: Request): string => {
  const { token } = cookieParser(req.headers.cookie);
  const id = verifyJwtToken(token);

  if (!id) throw new UnauthorizedError('User not logged in');

  return id;
};
