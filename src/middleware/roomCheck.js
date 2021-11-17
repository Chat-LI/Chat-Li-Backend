'use strict';

module.exports = async (req, res, next) => {
  if (req.body.room) req.isRoom = true;
  next();
};
