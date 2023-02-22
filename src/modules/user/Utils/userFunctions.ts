import {
  ApiError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../../../helpers/ApiErrors.js';
import { IUser, IUserRefined } from '../Interface/IUser.js';

export const usersMemory: IUser[] = [];

export const checkUserExist = (id: string): void => {
  const foundUser = usersMemory.find((user) => user.id === id);
  if (!foundUser) throw new NotFoundError('User not found');
};

export const updateUserInfo = (id: string, userData: IUser): IUser => {
  const userIndex = usersMemory.findIndex((user) => user.id === id);

  usersMemory[userIndex] = { ...usersMemory[userIndex], ...userData };

  return usersMemory[userIndex];
};

export const checkAllUserFieldsRecived = (object: unknown): void => {
  const userFields = ['name', 'password', 'email'];

  if (!object || typeof object !== 'object') return;

  const allFieldsWereSend = userFields.every((field) => field in object);
  if (!allFieldsWereSend)
    throw new BadRequestError('Some fields were not sent');
};

export const getIdFromParam = (idFromUrl: string): string => {
  if (!idFromUrl)
    throw new BadRequestError('You must provide a id in request parameters');

  return idFromUrl;
};

type findBy = 'email' | 'id';
export const findUserBy = (findBy: findBy, input: string): IUser => {
  let user: IUser | undefined;

  switch (findBy) {
    case 'email':
      user = usersMemory.find((user) => user.email === input);
      break;

    case 'id':
      user = usersMemory.find((user) => user.id === input);
      break;

    default:
      break;
  }

  if (!user) throw new NotFoundError('User not found');

  return user;
};

export const refineUserObject = (user: IUser): IUserRefined => ({
  email: user.email,
  id: user.id,
  name: user.name,
});

export const checkEmailAlreadyInUse = (email: string): void => {
  const emailInUse = usersMemory.some((user) => user.email === email);

  if (emailInUse) throw new ApiError('This email is already in use', 409);
};

export const checkUserIsOwner = (userId: string, idFromUrl: string): void => {
  if (userId !== idFromUrl)
    throw new UnauthorizedError('You cannot change data from other user');
};
