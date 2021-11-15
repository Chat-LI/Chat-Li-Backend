'use strict';

require('dotenv').config();

const { db } = require('./src/models');
const { start } = require('./src/server.js');

db.sync().then(() => {
  start(process.env.PORT || 3000);
});
