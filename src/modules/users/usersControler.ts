import { Request, Response } from 'express';

import { usersMemory } from '../user/Utils/userFunctions.js';

export const getUsers = async (req: Request, res: Response) => {
  res.json(usersMemory);
};
