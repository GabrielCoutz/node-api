import { IUser } from './src/modules/user/Interface/IUser.js';

declare module 'vitest' {
  export interface TestContext {
    userResponse?: IUser;
  }
}
