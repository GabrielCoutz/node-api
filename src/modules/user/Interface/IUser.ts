export interface IUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  indexRef: number;
}

export type IUserRefined = Pick<IUser, 'email' | 'id' | 'name'>;
