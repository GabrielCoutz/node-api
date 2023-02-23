import bcrypt from 'bcrypt';

import {
  BadRequestError,
  UnauthorizedError,
} from '../../../helpers/ApiErrors.js';
import { findUserBy } from '../../user/Utils/userFunctions.js';

interface LoginPayload {
  email: string;
  password: string;
}

const loginFieldIsEmpty = ([key, value]: string[]): boolean => !!(key && value);

const loginPayloadIsEmpty = (payload: object): payload is LoginPayload => {
  const loginFields = ['password', 'email'];

  const allLoginFieldsWereSend = loginFields.every((field) => field in payload);
  if (!allLoginFieldsWereSend) return false;

  const fields = Object.entries(payload);
  return fields.every(loginFieldIsEmpty);
};

export const checkBodySended = (body: object): void => {
  if (!loginPayloadIsEmpty(body))
    throw new BadRequestError('Some fields were not sent');
};

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
