import { Router } from 'express';

import { getUsers } from './usersControler.js';

export const usersRouter = Router();

usersRouter.get('/', getUsers);
