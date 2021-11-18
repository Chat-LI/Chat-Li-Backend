'use strict';

// const supertest = require('');
// const app = require('');
// const server = require('');
// const jwt = require('');

// const start = supertest;
const supertest = require('supertest');
const app = require('../src/server.js');
const server = supertest(app.server);
const jwt = require('jsonwebtoken');

const { db } = require('../src/models');

beforeAll(async () => {
  await db.sync();
  // done();
});

afterAll(async () => {
  await db.drop();
  // done();
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

    //expect(response.status).toBe(201);
    expect(userObject.token).toBeDefined();
    expect(userObject.user.id).toBeDefined();
    expect(userObject.user.username).toEqual(userInfo['user'].username);
    // done();
  });
});

// it('can log in a user and sends an object with the user and token to the client', async (done) => {
//   const response = await server
//     .post('/signin')
//     .auth(userInfo['user'].username, userInfo['user'].password);

//   const userObject = response.body;
//   expect(response.status).toBe(200);
//   // expect(userObject.token).toBeDefined();
//   expect(userObject.user.id).toBeDefined();
//   expect(userObject.user.username).toEqual(userInfo['user'].username);
//   done();
// });

// it('can join a room', async () => {
//   await server.post('/rooms').send(roomInfo);
//   const response = await server
//     .post('/joinRoom')
//     // .send(roomInfo)
//     .auth(roomInfo.roomname, roomInfo.password);
//   const roomObject = response;
//   console.log(response);

//   expect(roomObject.roomname).toEqual(roomInfo.roomname);
//   expect(roomObject.password).toEqual(roomInfo.password);

// done();
//   });
// });

// describe('Checks if the user routes are properly functioning', () => {
//   let userInfo = {
//     admin: { username: 'admin123', password: 'password', role: 'admin' },
//     user: { username: 'user123', password: 'password', role: 'user' },
//   };

//   it('can allow admins to get one user, not allow users to do so', () => {});

//   it('can allow admins to get all users, not allow users to do so', () => {});

//   it('can allow admins to create users, not allow users to do so', () => {});

//   it('can allow admins to delete users, not allow users to do so', () => {});
// });
