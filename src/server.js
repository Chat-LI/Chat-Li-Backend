'use strict';

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

app.use(cors());
app.use(express.json());

//routes
app.use(authRoutes);
app.use('/users', userRoutes);

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);
});

module.exports = {
  server,
  start: (port) => {
    if (!port) {
      throw new Error('Missing Port');
    }
    server.listen(port, () => console.log(`Listening on ${port}`));
  },
};
