import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

import { IUser } from './Interface/IUser.js';
import {
  allUserFieldsRecived,
  checkUser,
  emailAlreadyInUse,
  findUserBy,
  refineUserObject,
  updateUserInfo,
  usersMemory,
} from './Utils/userFunctions.js';

export const getUser = async (req: Request, res: Response) => {
  const id = checkUser(req);

  const idFromUrl = req.params.id;
  if (id !== idFromUrl)
    return res.json({ message: 'You cannot get info from other user' });

  const user = findUserBy('id', id) as IUser;

  res.status(200).json({ user: refineUserObject(user) });
};

export const createUser = async (req: Request, res: Response) => {
  allUserFieldsRecived(req.body);

  const { name, email, password } = req.body;
  emailAlreadyInUse(email);

  const id = randomUUID();
  const user: IUser = {
    id,
    email,
    name,
    passwordHash: await bcrypt.hash(password, 12),
    indexRef: usersMemory.length + 1,
  };

  usersMemory.push(user); // save user in fake database

  res.status(201).json({ user: refineUserObject(user) });
};

export const updateUser = async (req: Request, res: Response) => {
  const id = checkUser(req);

  const body = req.body as IUser;
  const user = updateUserInfo(id, body);

  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = checkUser(req);

  const idFromUrl = req.params.id;
  if (id !== idFromUrl)
    return res.json({ message: 'You cannot delete other user' });

  const userIndex = usersMemory.findIndex((user) => user.id === idFromUrl);
  usersMemory.splice(userIndex, 1);

  res.json({ message: 'User deleted' });
};
