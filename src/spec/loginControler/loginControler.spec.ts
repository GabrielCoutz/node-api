import request from 'supertest';
import { expect, describe, it, beforeEach } from 'vitest';

import { IUserRefined } from '../../modules/user/Interface/IUser.js';
import { app, newUserData } from '../staticData.js';

describe('Endopint: /login', () => {
  let user: IUserRefined;

  beforeEach(async () => {
    const response = await request(app).post('/user').send(newUserData);
    user = response.body;
  });

  it('Should not log in with missing fields', async () => {
    const response = await request(app).post('/login').send({
      email: 'anyemail@example.com',
    });
    expect(response.statusCode).toBe(401);
  });

  it('Should not log in with unknown credentials', async () => {
    const response = await request(app).post('/login').send({
      email: 'anyemail@example.com',
      password: 'anyPassword',
    });
    expect(response.statusCode).toBe(401);
  });

  it('Should not log in with incorrect password', async () => {
    const response = await request(app).post('/login').send({
      email: user.email,
      password: 'anyPassword',
    });
    expect(response.statusCode).toBe(401);
  });

  it('Should log in with correct credentials and return token', async () => {
    const response = await request(app).post('/login').send({
      email: newUserData.email,
      password: newUserData.password,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeTypeOf('string');
  });
});
