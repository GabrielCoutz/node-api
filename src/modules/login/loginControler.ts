import { Request, Response } from 'express';

import { BadRequestError } from '../../helpers/ApiErrors.js';
import { allFieldsSendedFrom } from '../../helpers/validators.js';
import { generateToken } from '../user/Utils/Token.js';
import { findUserBy } from '../user/Utils/userFunctions.js';
import { checkCredentials } from './Utils/loginFunctions.js';

export const login = async (req: Request, res: Response) => {
  if (!allFieldsSendedFrom('login', req.body))
    throw new BadRequestError('Some fields were not sent');

  const { email, password } = req.body;
  await checkCredentials(email, password);

  const user = findUserBy('email', email);
  const token = generateToken(user.id);

  res.json({ token, id: user.id });
};
