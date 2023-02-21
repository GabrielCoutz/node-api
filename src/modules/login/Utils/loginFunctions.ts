import bcrypt from 'bcrypt';

import { IUser } from '../../user/Interface/IUser.js';
import { usersMemory } from '../../user/Utils/userFunctions.js';

export const allLoginFieldsRecived = (object: unknown): boolean => {
  const userFields = ['password', 'email'];

  if (!object || typeof object !== 'object') return false;

  return userFields.every((field) => field in object);
};

export const checkPassword = async (password: string, passwordHash: string) =>
  bcrypt.compare(password, passwordHash);

export const findUser = (email: string): IUser | undefined =>
  usersMemory.find((user) => user.email === email);

export const checkCredentials = async (
  email: string,
  password: string,
): Promise<undefined | IUser> => {
  const user = findUser(email);
  if (!user) return;

  const passwordIsValid = await checkPassword(password, user.passwordHash);

  if (user.email !== email || !passwordIsValid) return;

  return user;
};
