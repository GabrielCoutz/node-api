import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { middlewareError } from './helpers/MiddlewareError.js';
import { loginRouter } from './modules/login/loginRouter.js';
import { userRouter } from './modules/user/userRouter.js';
import { usersRouter } from './modules/users/usersRouter.js';

dotenv.config();

export const server = express();

server.use(cors());
server.use(express.json());

server.use('/user', userRouter);
server.use('/users', usersRouter);

server.use('/login', loginRouter);

server.use(middlewareError);
server.listen(3333, () => console.log('Rodando na porta => 3333'));
