import { Router } from 'express';

import { MethodNotAllowedError } from '../../helpers/ApiErrors.js';
import { getUsers } from './usersControler.js';

export const usersRouter = Router();

usersRouter.get('/', getUsers);

usersRouter.post('', () => {
  throw new MethodNotAllowedError();
});
usersRouter.patch('', () => {
  throw new MethodNotAllowedError();
});
usersRouter.put('', () => {
  throw new MethodNotAllowedError();
});
usersRouter.delete('', () => {
  throw new MethodNotAllowedError();
});
