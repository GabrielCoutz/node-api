import dotenv from 'dotenv';
import express from 'express';

import { loginRouter } from './modules/login/loginRouter.js';
import { userRouter } from './modules/user/userRouter.js';
import { usersRouter } from './modules/users/usersRouter.js';
dotenv.config();

const server = express();
server.use(express.json());

server.use('/user', userRouter);
server.use('/users', usersRouter);

server.use('/login', loginRouter);

server.listen(3333, () => console.log('Rodando na porta => 3333'));
