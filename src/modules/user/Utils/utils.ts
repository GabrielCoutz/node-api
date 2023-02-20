import { IUser } from '../Interface/IUser.js';

export const userMemory: IUser[] = [];

export const userExists = (id: string): boolean => {
  const result = userMemory.find((user) => user.id === id);

  return result ? true : false;
};

export const updateUserInfo = (id: string, userData: IUser): IUser => {
  const userIndex = userMemory.findIndex((user) => user.id === id);

  userMemory[userIndex] = { ...userMemory[userIndex], ...userData };

  return userMemory[userIndex];
};
