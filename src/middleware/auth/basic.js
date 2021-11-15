'use strict';

const base64 = require('base-64');
const { users } = require('../../models');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return _authError();
  }

  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');
  try {
    req.user = await users.authenticateBasic(user, pass);
    next();
  } catch (err) {
    _authError(err);
  }

  function _authError(err) {
    console.log(err);
    res.status(403).send('Invalid Login');
  }
};
