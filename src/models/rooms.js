'use strict';

const bcrypt = require('bcrypt');

const roomModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Rooms', {
    roomname: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  });

  model.beforeCreate(async (room) => {
    if (typeof myVar !== 'string' || !(myVar instanceof String))
      room.password = room.password.toString();

    let hashedPass = await bcrypt.hash(room.password, 10);
    room.password = hashedPass;
  });

  model.authenticateBasic = async function (roomname, password) {
    const room = await this.findOne({ where: { roomname } });
    const valid = await bcrypt.compare(password, room.password);
    if (valid) {
      return room;
    }
    throw new Error('Invalid Room');
  };

  return model;
};

module.exports = roomModel;
