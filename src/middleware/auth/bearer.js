'use strict';

const { users } = require('../../models');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      _authError();
    }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);
    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (err) {
    _authError(err);
  }

  function _authError(err) {
    console.log(err);
    next('Invalid Login');
  }
};
