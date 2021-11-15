'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./users.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite::memory';

const DATABASE_CONFIG =
  process.env.NODE_ENV === 'production'
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

const users = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users: users,
};
