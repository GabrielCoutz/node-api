import { Request, Response } from 'express';

import { allFieldsRecived } from './Utils/checkFields.js';

export const login = async (req: Request, res: Response) => {
  if (!allFieldsRecived(req.body))
    res.json({ message: 'Some fields were not sent' });

  const { email, password } = req.body;

  console.log(email, password);

  res.json({ email, password });
};
