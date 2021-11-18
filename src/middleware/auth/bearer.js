'use strict';

const { users } = require('../../models');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);
    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
};
