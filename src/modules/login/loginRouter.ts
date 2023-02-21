import { Router } from 'express';

import { login } from './loginControler.js';
export const loginRouter = Router();

loginRouter.post('/', login);
