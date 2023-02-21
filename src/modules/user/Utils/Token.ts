import { Request } from 'express';
import jwt from 'jsonwebtoken';

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

export const getIdFromToken = (req: Request): string | undefined => {
  const { token } = cookieParser(req.headers.cookie);
  const id = verifyJwtToken(token);

  return id;
};
