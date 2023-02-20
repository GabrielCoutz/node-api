import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

import { IUser } from './Interface/IUser.js';
import { generateToken, loggedUserId } from './Utils/Token.js';

const userMemory: IUser[] = [];

export const getUsers = async (req: Request, res: Response) => {
  res.json(userMemory);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = userMemory.find((user) => user.id === id);

  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const id = randomUUID();

  const user: IUser = {
    id,
    email,
    name,
  };

  userMemory.push(user);

  const token = generateToken(id);

  res.json({ token });
};

export const updateUser = async (req: Request, res: Response) => {
  const id = loggedUserId(req);

  if (!id) return res.json({ message: 'User not logged in' });

  const { name, email } = req.body as IUser;

  const userIndex = userMemory.findIndex((user) => user.id === id);
  userMemory[userIndex] = { id, name, email };

  res.json(userMemory[userIndex]);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userIndex = userMemory.findIndex((user) => user.id === id);

  userMemory.splice(userIndex, 1);

  res.json({ message: 'User deleted successfully' });
};
