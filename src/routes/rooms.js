'use strict';

const express = require('express');
const router = express.Router();

const { rooms } = require('../models');

const acl = require('../middleware/auth/acl');
const bearerAuth = require('../middleware/auth/bearer');

//Adding delete permission requirements for now: Only admins should be using this routes
router.get('/', getAllRooms);
//router.get('/:id', getOneRooms);
router.post('/', createRoom);
//router.put('/:id', updateRooms);
router.delete('/:id', bearerAuth, acl('delete'), deleteRoom);

async function getAllRooms(req, res) {
  let allRooms = await rooms.findAll({});
  res.status(200).json(allRooms);
}

// async function getOneRoom(req, res) {
//   let room = await rooms.findOne({ where: { id: req.params.id } });
//   res.status(200).json(room);
// }

async function createRoom(req, res) {
  let result = await rooms.create(req.body);
  res.status(201).json(result);
}

// async function updateUser (req, res) {

// }

async function deleteRoom(req, res) {
  let result = await rooms.destroy({ where: { id: req.params.id } });
  res.status(201).json(result);
}

module.exports = router;
