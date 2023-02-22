import { Request } from 'express';

import {
  ApiError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../../../helpers/ApiErrors.js';
import { IUser, IUserRefined } from '../Interface/IUser.js';
import { getIdFromToken } from './Token.js';

export const usersMemory: IUser[] = [];

export const userExists = (id: string): boolean => {
  const foundUser = usersMemory.find((user) => user.id === id);

  return !!foundUser;
};

export const updateUserInfo = (id: string, userData: IUser): IUser => {
  const userIndex = usersMemory.findIndex((user) => user.id === id);

  usersMemory[userIndex] = { ...usersMemory[userIndex], ...userData };

  return usersMemory[userIndex];
};

export const allUserFieldsRecived = (object: unknown): void => {
  const userFields = ['name', 'password', 'email'];

  if (!object || typeof object !== 'object') return;

  const allFieldsWereSend = userFields.every((field) => field in object);
  if (!allFieldsWereSend)
    throw new BadRequestError('Some fields were not sent');
};

export const checkUser = (req: Request): string => {
  const id = getIdFromToken(req);

  if (!id) throw new UnauthorizedError('User not logged in');

  if (!userExists(id)) throw new NotFoundError('User not found');

  return id;
};

type findBy = 'email' | 'id';
export const findUserBy = (
  findBy: findBy,
  input: string,
): IUser | undefined => {
  switch (findBy) {
    case 'email':
      return usersMemory.find((user) => user.email === input);

    case 'id':
      return usersMemory.find((user) => user.id === input);

    default:
      return undefined;
  }
};

export const refineUserObject = (user: IUser): IUserRefined => ({
  email: user.email,
  id: user.id,
  name: user.name,
});

export const emailAlreadyInUse = (email: string): void => {
  const emailInUse = usersMemory.some((user) => user.email === email);

  if (emailInUse) throw new ApiError('This email is already in use', 409);
};
