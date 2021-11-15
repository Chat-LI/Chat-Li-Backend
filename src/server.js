'use strict';

const express = require('express');
const app = express();

const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

app.use(cors());
app.use(express.json());

//routes
app.use(authRoutes);
app.use('/users', userRoutes);

module.exports = {
  server: app,
  start: (port) => {
    if (!port) {
      throw new Error('Missing Port');
    }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
