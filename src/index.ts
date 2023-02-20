import dotenv from 'dotenv';
import express from 'express';

import { userRouter } from './modules/user/userRouter.js';
dotenv.config();

const server = express();
server.use(express.json());

server.use('/user', userRouter);

server.listen(3333, () => console.log('Rodando na porta => 3333'));
