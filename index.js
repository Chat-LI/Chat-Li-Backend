'use strict';

require('dotenv').config();

const { Server } = require('socket.io');
const io = new Server();

const { db } = require('./src/models');
const app = require('./src/server.js');

db.sync().then(() => {
  app.start(process.env.PORT || 3000);
});

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);
});

io.listen(process.env.SOCKET_PORT || 3030);
