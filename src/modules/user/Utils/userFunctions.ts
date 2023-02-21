import { Request } from 'express';

import { IUser } from '../Interface/IUser.js';
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

export const allUserFieldsRecived = (object: unknown): boolean => {
  const userFields = ['name', 'password', 'email'];

  if (!object || typeof object !== 'object') return false;

  return userFields.every((field) => field in object);
};

export const checkUser = (
  req: Request,
): { id: string } | { message: string } => {
  const id = getIdFromToken(req);

  if (!id) return { message: 'User not logged in' };

  if (!userExists(id)) return { message: 'User not found' };

  return { id };
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
