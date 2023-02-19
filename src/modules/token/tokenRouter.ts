import { Router } from 'express';

import { verifyToken } from './tokenControler.js';

export const tokenRouter = Router();

tokenRouter.get('/verify', verifyToken);
