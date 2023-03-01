import request from 'supertest';
import { expect, describe, it } from 'vitest';

import { EndpointPayload } from '../../helpers/validators.js';
import server from '../../index.js';
import { IUserRefined } from '../../modules/user/Interface/IUser.js';
import { generateToken } from '../../modules/user/Utils/Token.js';

const newUser: EndpointPayload<'user'> = {
  name: 'test',
  email: 'test@gmail.com',
  password: 'test',
};

const updatedUser: EndpointPayload<'user'> = {
  name: 'updated',
  email: 'updated@gmail.com',
  password: 'updated',
};
const app = server;

describe('Endpoint: /user', () => {
  let user: IUserRefined;

  it('Should create a new user', async () => {
    const response = await request(app).post('/user').send(newUser);
    user = response.body;
    expect(response.statusCode).toEqual(201);
  });

  it('Should not create a new user with missing fields', async () => {
    const response = await request(app).post('/user').send({
      email: 'test',
    });
    expect(response.statusCode).toEqual(400);
  });

  it('Should not create a new user with email already in use', async () => {
    const response = await request(app).post('/user').send(newUser);
    expect(response.statusCode).toEqual(409);
  });

  it('Should get user data', async () => {
    const response = await request(app).get(`/user/${user.id}`);
    const returnedUser = response.body;
    expect(response.statusCode).toEqual(200);
    expect(returnedUser).toStrictEqual(user);
  });

  it('Should not get non-existing user', async () => {
    const response = await request(app).get('/user/123');
    expect(response.statusCode).toEqual(404);
  });

  it('Should not update user data without log in', async () => {
    const response = await request(app)
      .patch(`/user/${user.id}`)
      .send(updatedUser);
    expect(response.statusCode).toEqual(400);
  });

  it('Should update user data with log in', async () => {
    const token = generateToken(user.id);
    const response = await request(app)
      .patch(`/user/${user.id}`)
      .auth(token, { type: 'bearer' })
      .send(updatedUser);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toStrictEqual({
      name: updatedUser.name,
      email: updatedUser.email,
      id: user.id,
    });
  });

  it('Should not update other user', async () => {
    const token = generateToken(user.id);
    const response = await request(app)
      .patch('/user/123')
      .auth(token, { type: 'bearer' })
      .send(updatedUser);

    expect(response.statusCode).toEqual(401);
  });

  it('Should not delete user without log in', async () => {
    const response = await request(app).delete(`/user/${user.id}`);

    expect(response.statusCode).toEqual(400);
  });

  it('Should delete user with log in', async () => {
    const token = generateToken(user.id);
    const response = await request(app)
      .delete(`/user/${user.id}`)
      .auth(token, { type: 'bearer' });

    expect(response.statusCode).toEqual(200);
  });
});
