import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

import { IUser } from './Interface/IUser.js';
import { getIdFromHttpCookie } from './Utils/Token.js';
import {
  checkAllUserFieldsRecived,
  checkEmailAlreadyInUse,
  findUserBy,
  refineUserObject,
  updateUserInfo,
  usersMemory,
  getIdFromParam,
  checkUserIsOwner,
} from './Utils/userFunctions.js';

export const getUser = async (req: Request, res: Response) => {
  const idFromParam = getIdFromParam(req.params.id);

  const user = findUserBy('id', idFromParam);

  res.status(200).json(refineUserObject(user));
};

export const createUser = async (req: Request, res: Response) => {
  checkAllUserFieldsRecived(req.body);

  const { name, email, password } = req.body;
  checkEmailAlreadyInUse(email);

  const id = randomUUID();
  const user: IUser = {
    id,
    email,
    name,
    passwordHash: await bcrypt.hash(password, 12),
    indexRef: usersMemory.length + 1,
  };
  usersMemory.push(user); // save user in fake database

  res.status(201).json(refineUserObject(user));
};

export const updateUser = async (req: Request, res: Response) => {
  const idFromCookie = getIdFromHttpCookie(req);
  const idFromParam = getIdFromParam(req.params.id);

  checkUserIsOwner(idFromCookie, idFromParam);

  const body = req.body as IUser;
  const user = updateUserInfo(idFromCookie, body);

  res.status(200).json(refineUserObject(user));
};

export const deleteUser = async (req: Request, res: Response) => {
  const idFromCookie = getIdFromHttpCookie(req);
  const idFromParam = getIdFromParam(req.params.id);

  checkUserIsOwner(idFromCookie, idFromParam);

  const userIndex = usersMemory.findIndex((user) => user.id === idFromCookie);
  usersMemory.splice(userIndex, 1); // delete user from fake database

  res.status(200).json(true);
};
