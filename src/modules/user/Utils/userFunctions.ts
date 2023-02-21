import { IUser } from '../Interface/IUser.js';

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
