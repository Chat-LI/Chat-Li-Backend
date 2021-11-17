'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('../models/index');
const basicAuth = require('../middleware/auth/basic');

authRouter.post('/signup', async (req, res, next) => {
  try {
    req.body.loggedIn = false;
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  try {
    const user = {
      user: req.user,
      token: req.user.token,
    };
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(403).send(err.message);
  }
});

module.exports = authRouter;
