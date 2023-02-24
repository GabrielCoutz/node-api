import { Request, Response } from 'express';

import { generateToken } from '../user/Utils/Token.js';
import { findUserBy } from '../user/Utils/userFunctions.js';
import { checkBodySended, checkCredentials } from './Utils/loginFunctions.js';

export const login = async (req: Request, res: Response) => {
  checkBodySended(req.body);

  const { email, password } = req.body;
  await checkCredentials(email, password);

  const user = findUserBy('email', email);
  const token = generateToken(user.id);

  // res.cookie('token', token, {
  //   secure: true,
  //   httpOnly: true, //no access from code
  //   maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
  //   sameSite: 'none',
  // });

  res.json({ token, id: user.id });
};
