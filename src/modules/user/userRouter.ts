import { Router } from 'express';

import {
  deleteUser,
  getUser,
  createUser,
  updateUser,
} from './userControler.js';

export const userRouter = Router();

userRouter.post('/', createUser);

userRouter.get(['/:id', '/'], getUser);

userRouter.delete(['/:id', '/'], deleteUser);

userRouter.patch(['/:id', '/'], updateUser);
