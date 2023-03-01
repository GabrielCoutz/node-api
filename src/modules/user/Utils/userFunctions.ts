import { Request } from 'express';

import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../../../helpers/ApiErrors.js';
import { existValueIn } from '../../../helpers/validators.js';
import { IUser, IUserRefined } from '../Interface/IUser.js';
import { getIdFromBearerToken } from './Token.js';

export const usersMemory: IUser[] = [];

export const updateUserInfo = (id: string, userData: IUser): IUser => {
  const userIndex = usersMemory.findIndex((user) => user.id === id);

  usersMemory[userIndex] = { ...usersMemory[userIndex], ...userData };

  return usersMemory[userIndex];
};

export const getIdFromParam = (idFromUrl: string | undefined): string => {
  if (!idFromUrl)
    throw new BadRequestError('You must provide a id in request parameters');

  return idFromUrl;
};

/**
 * Recebe chave e valor para realizar a pesquisa do usuário.
 * @param key chave para pesquisa
 * @param value valor a ser usado na pesquisa
 * @returns
 */
export const findUserBy = (
  key: 'email' | 'id',
  value: string,
): IUser | undefined => usersMemory.find((user) => user[key] === value);

/**
 * Recebe um objeto cheio e retorna o mesmo mas sem propriedades privadas.
 * @param user Objeto do tipo Usuário com todas propriedades.
 * @returns Objeto do tipo Usuário mas sem propriedades sensíveis, como senha.
 * @example refineUserObject({
 * name: '...',
 * email: '...',
 * password: '...'
 * }) // { name: '...', email: '...' }
 */

export const refineUserObject = (user: IUser): IUserRefined => ({
  email: user.email,
  id: user.id,
  name: user.name,
});

/**
 * Verifica se o usuário é o dono do ID que pretende realizar a ação.
 * @param userId ID do usuário vindo do token
 * @param idFromUrl ID do usuário vindo do endpoint
 * @example checkUserIsOwner('123abc', '123def'); // UnauthorizedError
 * checkUserIsOwner('123abc', '123abc'); // continua a execução
 */
export const checkUserIsOwner = (userId: string, idFromUrl: string): void => {
  if (userId !== idFromUrl)
    throw new UnauthorizedError('You cannot change data from other user');
};

/**
 * Recebe a requisição e verifica se o token foi passado e se o id contido no mesmo é igual ao enviado no endpoint. Se não, dispara um erro.
 * @param req Requisição
 * @returns ID do usuário
 */
export const handleRequest = (req: Request): string => {
  const idFromToken = getIdFromBearerToken(req.headers.authorization);
  const idFromParam = getIdFromParam(req.params.id);

  checkUserIsOwner(idFromToken, idFromParam);

  return idFromToken;
};
