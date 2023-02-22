import { Request, Response } from 'express';

import { refineUserObject, usersMemory } from '../user/Utils/userFunctions.js';

export const getUsers = async (req: Request, res: Response) => {
  const users = usersMemory.map(refineUserObject);
  res.json(users);
};
