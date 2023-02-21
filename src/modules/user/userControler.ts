import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

import { IUser } from './Interface/IUser.js';
import { generateToken, loggedUserId } from './Utils/Token.js';
import { updateUserInfo, userExists, userMemory } from './Utils/utils.js';

export const getUsers = async (req: Request, res: Response) => {
  res.json(userMemory);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = userMemory.find((user) => user.id === id);

  res.json(user);
};

export const allFieldsRecived = (object: unknown): boolean => {
  const userFields = ['name', 'password', 'email'];

  if (!object || typeof object !== 'object') return false;

  return userFields.every((field) => field in object);
};

export const createUser = async (req: Request, res: Response) => {
  if (!allFieldsRecived(req.body))
    res.json({ message: 'Some fields were not sent' });

  const { name, email, password } = req.body;
  const id = randomUUID();

  const user: IUser = {
    id,
    email,
    name,
    passwordHash: await bcrypt.hash(password, 12),
    indexRef: userMemory.length + 1,
  };

  userMemory.push(user);

  const token = generateToken(id);
  res.cookie('token', token, {
    secure: false, // cuz is localhost
    httpOnly: true, //no access from code
    maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
    path: '/',
    sameSite: 'strict',
  });

  res.json({ token });
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

  const userIndex = userMemory.findIndex((user) => user.id === id);
  if (!userIndex) return res.json({ message: 'User not found' });

  userMemory.splice(userIndex, 1);
  res.json({ message: 'User deleted' });
};
