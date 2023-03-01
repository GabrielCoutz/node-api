import request from 'supertest';
import { expect, describe, it, beforeEach } from 'vitest';

import { IUserRefined } from '../../modules/user/Interface/IUser.js';
import { app, newUsersPayload } from '../staticData.js';

describe('Endpoint: /users', () => {
  const usersArray: IUserRefined[] = [];
  beforeEach(async () => {
    const { body } = await request(app).post('/user').send(newUsersPayload[0]);
    usersArray.push(body);
  });

  it('Should return a list of users', async () => {
    const response = await request(app).get('/users');
    expect(response.body).toStrictEqual(usersArray);
  });
});
