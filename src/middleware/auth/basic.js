'use strict';

const base64 = require('base-64');
const { users } = require('../../models');

module.exports = async (req, res, next) => {
  try {
    let basic = req.headers.authorization.split(' ').pop();
    let [user, pass] = base64.decode(basic).split(':');
    req.user = await users.authenticateBasic(user, pass);
    next();
  } catch (err) {
    console.log(err);
    res.status(403).send(err.message);
  }
};
