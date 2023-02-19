import { Request, Response } from 'express';

import { checkToken } from '../user/Utils/Token.js';

export const verifyToken = async (req: Request, res: Response) => {
  const { token } = req.body;

  const tokenIsValid = checkToken(token);

  res.json(tokenIsValid);
};
