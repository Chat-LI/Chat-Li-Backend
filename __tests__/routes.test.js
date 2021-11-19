'use strict';

const supertest = require('supertest');
const app = require('../src/server.js');
const server = supertest(app.server);
const { db } = require('../src/models');
beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});
describe('Checks if Auth routes are properly functioning', () => {
  let userInfo = {
    admin: { username: 'admin123', password: 'password', role: 'admin' },
    user: { username: 'user123', password: 'password', role: 'user' },
  };
  let roomInfo = {
    roomname: 'room1',
    password: 'password1',
  };
  it('can create a new user and sends an object with the user and the token to the client', async () => {
    const response = await server.post('/signup').send(userInfo['user']);
    const userObject = response.body;
    expect(userObject.token).toBeDefined();
    expect(userObject.user.id).toBeDefined();
    expect(userObject.user.username).toEqual(userInfo['user'].username);
  });
  it('can join a room', async () => {
    await server.post('/rooms').send(roomInfo);
    const response = await server
      .post('/joinRoom')
      .send({ isRoom: true })
      .auth(roomInfo.roomname, roomInfo.password);
    const roomObject = response.body;
    expect(roomObject.room.roomname).toEqual(roomInfo.roomname);
    expect(roomObject.room.password).toBeDefined();
  });
});
describe('Checks if the user routes are properly functioning', () => {
  let userInfo = {
    admin: { username: 'admin123', password: 'password', role: 'admin' },
    user: { username: 'user123', password: 'password', role: 'user' },
  };
  it('can allow admins to get one user, not allow users to do so', async () => {
    const response = await server.post('/signup').send(userInfo.admin);
    let user = { username: 'user1234', password: 'password', role: 'user' };
    const responseUser = await server.post('/signup').send(user);
    const token = response.body.user.token;
    const userToken = responseUser.body.user.token;
    const response2 = await server
      .get('/users/1')
      .set('Authorization', `Bearer ${token}`);
    const responseUser2 = await server
      .get('/users/1')
      .set('Authorization', `Bearer ${userToken}`);
    expect(response2.body.username).toBe('user123');
    expect(responseUser2.status).toBe(500);
  });
  it('can allow admins to get all users, not allow users to do so', async () => {
    let admin = { username: 'admin1234', password: 'password', role: 'admin' };
    const response = await server.post('/signup').send(admin);
    let user = { username: 'user12345', password: 'password', role: 'user' };
    const responseUser = await server.post('/signup').send(user);
    const token = response.body.user.token;
    const userToken = responseUser.body.user.token;
    const response2 = await server
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    const responseUser2 = await server
      .get('/users')
      .set('Authorization', `Bearer ${userToken}`);
    expect(response2.body.length).toBe(5);
    expect(responseUser2.status).toBe(500);
  });
  it('can allow admins to delete users, not allow users to do so', async () => {
    let admin = { username: 'admin12345', password: 'password', role: 'admin' };
    const response = await server.post('/signup').send(admin);
    let user = { username: 'user123456', password: 'password', role: 'user' };
    const responseUser = await server.post('/signup').send(user);
    const token = response.body.user.token;
    const userToken = responseUser.body.user.token;
    await server.delete('/users/1').set('Authorization', `Bearer ${token}`);
    const responseUser2 = await server
      .delete('/users/2')
      .set('Authorization', `Bearer ${userToken}`);
    const getCheck = await server
      .get('/users/1')
      .set('Authorization', `Bearer ${token}`);
    expect(getCheck.body).toBeNull();
    expect(responseUser2.status).toBe(500);
  });
});
