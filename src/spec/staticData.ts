import { EndpointPayload } from '../helpers/validators.js';
import server from '../index.js';

export const app = server;

export const newUserData: EndpointPayload<'user'> = {
  name: 'test',
  email: 'test@gmail.com',
  password: 'test',
};

export const updatedUserData: EndpointPayload<'user'> = {
  name: 'updated',
  email: 'updated@gmail.com',
  password: 'updated',
};

export const newUsersPayload: EndpointPayload<'user'>[] = [
  {
    name: 'test1',
    email: 'test1@gmail.com',
    password: 'test1',
  },
];
