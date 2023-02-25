import jwt from 'jsonwebtoken';

import {
  BadRequestError,
  UnauthorizedError,
} from '../../../helpers/ApiErrors.js';
import { existValueIn } from '../../../helpers/validators.js';

interface IToken {
  id: string;
}

/**
 * Recebe o token e verifica se a assinatura é válida. Se sim returna o ID contido no mesmo, se não retorna undefined.
 * @param token Bearer token
 * @returns 'token' | undefined
 * @example const result = extractTokenId('Bearer abcdefg');
 * if (result) // authorize
 * else // return UnauthorizedError
 */
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

/**
 * Recebe a string 'Bearer ...' e devolve apenas o token
 * @param authorization 'Bearer ...'
 * @returns Token.
 * @example getToken('Bearer abcdefg') // 'abcdefg'
 */
const getToken = (authorization: string): string => {
  const token = authorization.split(' ')[1];
  return token;
};

/**
 * Recebe o header authorization e verifica se foi enviado um token.
 * @param authorization  Valor passado em Authorization: 'Bearer ...'
 * @returns ID do usuário enviado junto ao token.
 * @example const userId = getIdFromBearerToken('Bearer abcdefgh')
 * // userId = 123
 */
export const getIdFromBearerToken = (
  authorization: string | undefined,
): string => {
  if (!existValueIn(authorization))
    throw new BadRequestError('You must send an authorization header');

  const token = getToken(authorization);

  const id = extractTokenId(token);
  if (!existValueIn(id)) throw new UnauthorizedError('User not logged in');

  return id;
};
