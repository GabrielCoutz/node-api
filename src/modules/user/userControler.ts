import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

import { IUser } from './Interface/IUser.js';
import { generateToken, loggedUserId } from './Utils/Token.js';
import {
  allUserFieldsRecived,
  updateUserInfo,
  userExists,
  usersMemory,
} from './Utils/userFunctions.js';

export const getUsers = async (req: Request, res: Response) => {
  res.json(usersMemory);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = usersMemory.find((user) => user.id === id);

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
  const id = loggedUserId(req);

  if (!id) return res.json({ message: 'User not logged in' });
  if (!userExists(id)) res.json({ message: 'User not found' });

  const body = req.body as IUser;
  const user = updateUserInfo(id, body);

  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = loggedUserId(req);
  if (!id) return res.json({ message: 'User not logged in' });

  const userIndex = usersMemory.findIndex((user) => user.id === id);
  if (!userIndex) return res.json({ message: 'User not found' });

  usersMemory.splice(userIndex, 1);
  res.json({ message: 'User deleted' });
};
