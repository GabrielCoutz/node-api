export const allFieldsRecived = (object: unknown): boolean => {
  const userFields = ['password', 'email'];

  if (!object || typeof object !== 'object') return false;

  return userFields.every((field) => field in object);
};
