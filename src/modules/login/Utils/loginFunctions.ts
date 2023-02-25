import bcrypt from 'bcrypt';

import { UnauthorizedError } from '../../../helpers/ApiErrors.js';
import { findUserBy } from '../../user/Utils/userFunctions.js';

export const checkPassword = async (
  password: string,
  passwordHash: string,
): Promise<void> => {
  const passwordIsValid = await bcrypt.compare(password, passwordHash);

  if (!passwordIsValid) throw new UnauthorizedError('Invalid credentials.');
};

export const checkCredentials = async (
  email: string,
  password: string,
): Promise<void> => {
  const user = findUserBy('email', email);

  await checkPassword(password, user.passwordHash);

  if (user.email !== email) throw new UnauthorizedError('Invalid credentials.');
};
