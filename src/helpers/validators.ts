/**
 *
 * @param item Objeto a ser verificado.
 * @returns Tipo do objeto, sem ser falsy.
 * @example const objectA: string | undefined = '';
 * const objectB = {};
 * const objectC: User | undefined;
 * -
 * existValueIn(objectA) // false;
 * existValueIn(objectB) // false;
 * existValueIn(objectC) // true -> objectC is object;
 */

export const existValueIn = <T extends object | undefined>(
  item: T,
): item is NonNullable<T> => item && !(Object.keys(item) || item).length;

type endpoints = '/user' | '/login';
interface BodyPayload {
  [key: string]: string;
}

/**
 *
 * @param endpoint "Os campos serão validados de acordo com o enpoint passado."
 * @param payload "Corpo enviado na requisição."
 * @returns Boolean.
 */

export const allFieldsSendedFrom = (
  endpoint: endpoints,
  payload: object,
): payload is BodyPayload => {
  const userFields = ['name', 'password', 'email'];
  const loginFields = ['password', 'email'];
  let allFieldsWereSend: boolean;

  switch (endpoint) {
    case '/login':
      allFieldsWereSend = loginFields.every((field) => field in payload);
      break;

    case '/user':
      allFieldsWereSend = userFields.every((field) => field in payload);
      break;

    default:
      allFieldsWereSend = false;
      break;
  }

  return allFieldsWereSend;
};
