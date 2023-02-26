import bcrypt from 'bcrypt';

import { UnauthorizedError } from '../../../helpers/ApiErrors.js';
import { findUserBy } from '../../user/Utils/userFunctions.js';

/**
 * Recebe a senha do usuário, criptofraga, e compara com a que já está no banco de dados.
 * @param password Senha enviada pelo usuário
 * @param passwordHash Senha criptografada guardada no banco
 * @returns Promise<true | false>
 */
export const comparePasswords = async (
  password: string,
  passwordHash: string,
): Promise<boolean> => await bcrypt.compare(password, passwordHash);

/**
 * Recebe as credenciais do usuário e verifica se são iguais às do banco. Se sim continua o código, se não, um erro é disparado.
 * @param email Email enviado pelo usuário
 * @param password Senha enviada pelo usuário
 */
export const checkCredentials = async (
  email: string,
  password: string,
): Promise<void> => {
  const user = findUserBy('email', email);
  const passwordIsValid = await comparePasswords(password, user.passwordHash);

  if (user.email !== email || !passwordIsValid)
    throw new UnauthorizedError('Invalid credentials.');
};
