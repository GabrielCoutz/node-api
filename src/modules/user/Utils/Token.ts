import { Request } from 'express';
import jwt from 'jsonwebtoken';

interface IToken {
  id: string;
}

export const generateToken = (payload: string): string =>
  jwt.sign({ id: payload }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });

export const checkToken = (token: string): boolean => {
  try {
    return !!jwt.verify(token, process.env.JWT_SECRET as string);
  } catch {
    return false;
  }
};

export const getIdFromToken = (req: Request): string | undefined => {
  const { headers } = req;
  const { authorization } = headers;

  if (!authorization) return;

  try {
    const [_, token] = authorization.split(' ');
    const { id } = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as IToken;

    return id;
  } catch {
    return;
  }
};

export const loggedUserId = (req: Request): undefined | string => {
  const id = getIdFromToken(req);

  if (!id) return;

  return id;
};
