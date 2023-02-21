import { Request, Response } from 'express';

import { generateToken } from '../user/Utils/Token.js';
import {
  allLoginFieldsRecived,
  checkCredentials,
} from './Utils/loginFunctions.js';

export const login = async (req: Request, res: Response) => {
  if (!allLoginFieldsRecived(req.body))
    return res.json({ message: 'Some fields were not sent' });

  const { email, password } = req.body;
  const credentialsMatch = await checkCredentials(email, password);
  if (!credentialsMatch) return res.json({ message: 'Invalid credentials.' });

  const token = generateToken(credentialsMatch.id);
  res.cookie('token', token, {
    secure: false, // cuz is localhost
    httpOnly: true, //no access from code
    maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
    path: '/',
    sameSite: 'strict',
  });

  res.json({ token });
};
