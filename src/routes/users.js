'use strict';

const express = require('express');
const router = express.Router();

const { users } = require('../models');

const acl = require('../middleware/auth/acl');
const bearerAuth = require('../middleware/auth/bearer');

router.get('/', bearerAuth, acl('delete'), getAllUsers);
router.get('/:id', bearerAuth, acl('delete'), getOneUser);
router.post('/', bearerAuth, acl('delete'), createUser);
router.delete('/:id', bearerAuth, acl('delete'), deleteUser);

async function getAllUsers(req, res) {
  let allUsers = await users.findAll({});
  res.status(200).json(allUsers);
}

async function getOneUser(req, res) {
  let user = await users.findOne({ where: { id: req.params.id } });
  res.status(200).json(user);
}

async function createUser(req, res) {
  let result = await users.create(req.body);
  res.status(201).json(result);
}

async function deleteUser(req, res) {
  let result = await users.destroy({ where: { id: req.params.id } });
  res.status(201).json(result);
}

module.exports = router;
