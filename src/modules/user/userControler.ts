import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

import { IUser } from './Interface/IUser.js';
import {
  allUserFieldsRecived,
  checkUser,
  findUserBy,
  updateUserInfo,
  usersMemory,
} from './Utils/userFunctions.js';

export const getUsers = async (req: Request, res: Response) => {
  res.json(usersMemory);
};

export const getUser = async (req: Request, res: Response) => {
  const result = checkUser(req);
  if ('message' in result) return res.json({ message: result.message });

  const idFromUrl = req.params.id;
  if (result.id !== idFromUrl)
    return res.json({ message: 'You cannot get info from other user' });

  const user = findUserBy('id', result.id);

  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  if (!allUserFieldsRecived(req.body))
    res.json({ message: 'Some fields were not sent' });

  const { name, email, password } = req.body;
  const id = randomUUID();

  const user: IUser = {
    id,
    email,
    name,
    passwordHash: await bcrypt.hash(password, 12),
    indexRef: usersMemory.length + 1,
  };

  usersMemory.push(user);

  res.json({ user });
};

export const updateUser = async (req: Request, res: Response) => {
  const result = checkUser(req);
  if ('message' in result) return res.json({ message: result.message });

  const body = req.body as IUser;
  const user = updateUserInfo(result.id, body);

  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const result = checkUser(req);
  if ('message' in result) return res.json({ message: result.message });

  const idFromUrl = req.params.id;
  if (result.id !== idFromUrl)
    return res.json({ message: 'You cannot delete other user' });

  const userIndex = usersMemory.findIndex((user) => user.id === idFromUrl);
  usersMemory.splice(userIndex, 1);

  res.json({ message: 'User deleted' });
};
