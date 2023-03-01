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

  it('Should return MethodNotAllowedError', async () => {
    const response = await request(app).post('/users');
    expect(response.status).toStrictEqual(405);
  });

  it('Should return MethodNotAllowedError', async () => {
    const response = await request(app).patch('/users');
    expect(response.status).toStrictEqual(405);
  });

  it('Should return MethodNotAllowedError', async () => {
    const response = await request(app).put('/users');
    expect(response.status).toStrictEqual(405);
  });

  it('Should return MethodNotAllowedError', async () => {
    const response = await request(app).delete('/users');
    expect(response.status).toStrictEqual(405);
  });
});
