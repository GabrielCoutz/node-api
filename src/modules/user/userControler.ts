import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from '../../helpers/ApiErrors.js';
import {
  allFieldsSendedFrom,
  emaillAreadyInUse,
  existValueIn,
} from '../../helpers/validators.js';
import { IUser } from './Interface/IUser.js';
import {
  findUserBy,
  refineUserObject,
  updateUserInfo,
  usersMemory,
  handleRequest,
} from './Utils/userFunctions.js';

export const getUser = async (req: Request, res: Response) => {
  const idFromParam = req.params.id;

  if (!existValueIn(idFromParam))
    throw new BadRequestError('You must provide an id in request parameters');

  const user = findUserBy('id', idFromParam);

  if (!existValueIn(user)) throw new NotFoundError('User not found');

  res.status(200).json(refineUserObject(user));
};

export const createUser = async (req: Request, res: Response) => {
  const result = allFieldsSendedFrom('user', req.body);
  if (result.isLeft())
    return res
      .status(result.value.status)
      .json({ message: result.value.message });

  const { name, email, password } = req.body;

  const resultEmail = emaillAreadyInUse(email);
  if (resultEmail.isLeft())
    return res
      .status(resultEmail.value.status)
      .json({ message: resultEmail.value.message });

  const id = randomUUID();
  const user: IUser = {
    id,
    email,
    name,
    passwordHash: await bcrypt.hash(password, 12),
    indexRef: usersMemory.length + 1,
  };
  usersMemory.push(user); // save user in fake database

  return res.status(201).json(refineUserObject(user));
};

export const updateUser = async (req: Request, res: Response) => {
  const id = handleRequest(req);

  const body = req.body as IUser;
  const user = updateUserInfo(id, body);

  res.status(200).json(refineUserObject(user));
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = handleRequest(req);

  const userIndex = usersMemory.findIndex((user) => user.id === id);
  const userHasBeenDeleted = !!usersMemory.splice(userIndex, 1).length; // delete user from fake database

  res.status(200).json(userHasBeenDeleted);
};
