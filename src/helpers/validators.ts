import { usersMemory } from '../modules/user/Utils/userFunctions.js';

/**
 *
 * @param item Objeto a ser verificado.
 * @returns Tipo do objeto, sem ser falsy.
 * @example const objectA: string | undefined = '';
 * const objectB = {};
 * const objectC: User | undefined = {name: '...'};
 * -
 * existValueIn(objectA) // false;
 * existValueIn(objectB) // false;
 * existValueIn(objectC) // true -> objectC is User;
 */
export const existValueIn = <T>(item: T): item is NonNullable<T> =>
  !!(item && Object.keys(item).length);

interface BodyPayload {
  [key: string]: string;
}
type endpoint = 'user' | 'login';

type UserFields = ['name', 'password', 'email'];
type LoginFields = ['password', 'email'];

interface Fields {
  user: UserFields;
  login: LoginFields;
}
/**
 * Campos que são enviados de acordo com o endpoint, representado pela chave.
 */
const fields: Fields = {
  user: ['name', 'password', 'email'],
  login: ['password', 'email'],
};

/**
 *
 * @param endpoint Os campos serão validados de acordo com o enpoint passado.
 * @param payload Corpo enviado na requisição.
 * @returns Boolean.
 * @example allFieldsSendedFrom('login', { email: '...' }) // false
 * allFieldsSendedFrom('login', { email: '...', password: '...' }) // true
 */
export const allFieldsSendedFrom = (
  endpoint: endpoint,
  payload: object,
): payload is BodyPayload => {
  const allFieldsWereSend = fields[endpoint].every((field) => field in payload);

  return allFieldsWereSend;
};

export const emaillAreadyInUse = (email: string): boolean =>
  usersMemory.some((user) => user.email === email);
