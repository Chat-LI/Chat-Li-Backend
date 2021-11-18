'use strict';

const base64 = require('base-64');
const { users, rooms } = require('../../models');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return _authError();
  }

  if (req.body.isRoom) {
    let basic = req.headers.authorization.split(' ').pop();
    let [username, password] = base64.decode(basic).split(':');
    try {
      req.room = await rooms.authenticateBasic(username, password);
      next();
    } catch (err) {
      _authError(err);
    }
  } else {
    let basic = req.headers.authorization.split(' ').pop();
    let [user, pass] = base64.decode(basic).split(':');
    try {
      req.user = await users.authenticateBasic(user, pass);
      next();
    } catch (err) {
      _authError(err);
    }
  }

  function _authError(err) {
    console.log(err);
    res.status(403).send(err.message);
  }
};
