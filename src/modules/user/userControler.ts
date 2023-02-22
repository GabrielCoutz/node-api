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
  const result = checkUser(req);
  if ('message' in result)
    return res.status(result.status).json({ message: result.message });

  const idFromUrl = req.params.id;
  if (result.id !== idFromUrl)
    return res.json({ message: 'You cannot get info from other user' });

  const user = findUserBy('id', result.id) as IUser;

  res.status(200).json({ user: refineUserObject(user) });
};

export const createUser = async (req: Request, res: Response) => {
  if (!allUserFieldsRecived(req.body))
    return res.status(400).json({ message: 'Some fields were not sent' });

  const { name, email, password } = req.body;

  if (emailAlreadyInUse(email))
    return res.status(409).json({ message: 'This email is already in use' });

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
  const result = checkUser(req);
  if ('message' in result)
    return res.status(result.status).json({ message: result.message });

  const body = req.body as IUser;
  const user = updateUserInfo(result.id, body);

  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const result = checkUser(req);
  if ('message' in result)
    return res.status(result.status).json({ message: result.message });

  const idFromUrl = req.params.id;
  if (result.id !== idFromUrl)
    return res.json({ message: 'You cannot delete other user' });

  const userIndex = usersMemory.findIndex((user) => user.id === idFromUrl);
  usersMemory.splice(userIndex, 1);

  res.json({ message: 'User deleted' });
};
