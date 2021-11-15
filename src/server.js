'use strict';

const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

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
  start: (port) => {
    if (!port) {
      throw new Error('Missing Port');
    }
    httpServer.listen(port, () => console.log(`Listening on ${port}`));
  },
};
