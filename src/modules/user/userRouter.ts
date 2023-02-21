import { Router } from 'express';

import {
  deleteUser,
  getUser,
  getUsers,
  createUser,
  updateUser,
} from './userControler.js';

export const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.post('/', createUser);

userRouter.get('/:id', getUser);

userRouter.delete('/', deleteUser);

userRouter.patch('/', updateUser);
