export interface IUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  indexRef: number;
}

export interface IUserRefined {
  id: string;
  email: string;
  name: string;
}
