import jwt from 'jsonwebtoken';

const secret = 'secretSuperSecreto123';

export const generateToken = (payload: string): string =>
  jwt.sign({ id: payload }, secret, {
    expiresIn: '1d',
  });

export const checkToken = (token: string): boolean => {
  try {
    return !!jwt.verify(token, secret);
  } catch {
    return false;
  }
};
