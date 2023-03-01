import request from 'supertest';
import { expect, vi, describe, it } from 'vitest';

import server from '../../index.js';

// const app = server;
const teste = {
  getUser: () => 'user',
};
const spy = vi.spyOn(teste, 'getUser').mockImplementation(() => 'mockUser');

describe('Test mocks', () => {
  it('return something', async () => {
    const user = teste.getUser();
    console.log(user);
  });
});
