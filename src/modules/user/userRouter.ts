import { Router } from 'express';

import { MethodNotAllowedError } from '../../helpers/ApiErrors.js';
import {
  deleteUser,
  getUser,
  createUser,
  updateUser,
} from './userControler.js';

export const userRouter = Router();

userRouter.post('/', createUser);

userRouter.get('/:id', getUser);
userRouter.get('/', getUser);

userRouter.delete('/:id', deleteUser);

userRouter.patch('/', updateUser);

userRouter.put('', () => {
  throw new MethodNotAllowedError();
});
