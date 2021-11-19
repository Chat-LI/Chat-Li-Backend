'use strict';

const express = require('express');
const router = express.Router();

const { rooms } = require('../models');

const acl = require('../middleware/auth/acl');
const bearerAuth = require('../middleware/auth/bearer');

router.get('/', getAllRooms);
router.post('/', createRoom);
router.delete('/:id', bearerAuth, acl('delete'), deleteRoom);

async function getAllRooms(req, res) {
  let allRooms = await rooms.findAll({});
  res.status(200).json(allRooms);
}

async function createRoom(req, res) {
  try {
    let result = await rooms.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteRoom(req, res) {
  let result = await rooms.destroy({ where: { id: req.params.id } });
  res.status(201).json(result);
}

module.exports = router;
