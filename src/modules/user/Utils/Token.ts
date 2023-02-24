import jwt from 'jsonwebtoken';

import {
  BadRequestError,
  UnauthorizedError,
} from '../../../helpers/ApiErrors.js';

interface IToken {
  id: string;
}

const extractTokenId = (token: string): string | undefined => {
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

const getToken = (authorization: string): string => {
  const token = authorization.split(' ')[1];
  return token;
};

export const getIdFromBearerToken = (
  authorization: string | undefined,
): string => {
  if (!authorization)
    throw new BadRequestError('You must send an authorization header');

  const token = getToken(authorization);

  const id = extractTokenId(token);
  if (!id) throw new UnauthorizedError('User not logged in');

  return id;
};
