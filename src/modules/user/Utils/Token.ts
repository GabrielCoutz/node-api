import jwt from 'jsonwebtoken';

const secret = 'secretSuperSecreto123';

export const generateToken = (payload: string): string =>
  jwt.sign(payload, secret);

export const checkToken = (token: string): boolean => {
  try {
    return !!jwt.verify(token, secret);
  } catch {
    return false;
  }
};
