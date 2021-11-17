module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`);

    socket.on('message', ({ message, room }) => {
      io.to(room).emit('message', { username: socket.username, message });
    });

    socket.on('join', ({ room, username }) => {
      console.log(`${socket.id} just joined room [${room}]`);
      socket.join(room);
      socket.username = username;
      io.to(room).emit('user-connected', username);
    });

    socket.on('quit', () => {
      socket.broadcast.emit('quit', socket.username);
      socket.disconnect(true);
    });

    socket.on('listUsers', () => {
      let allUsers = [];

      for (let [key, value] of io.of('/').sockets) {
        console.log(value.username);
        allUsers.push(value.username);
      }

      if (allUsers.length > 0) {
        io.to(socket.id).emit('listUsers', allUsers);
      }
    });

    socket.on('listRoomUsers', (room) => {
      let socketIds;
      let members = [];

      for (let [key, value] of io.of('/').adapter.rooms) {
        if (key.toLowerCase() === room) {
          socketIds = value;
        }
      }

      console.log("socket id's", socketIds);

      if (socketIds) {
        socketIds.forEach((socketId) => {
          let socketInRoom = io.of('/').sockets.get(socketId);
          members.push(socketInRoom.username);
        });
        console.log('room members', members);

        io.to(socket.id).emit('listRoomUsers', { members, room });
      }
    });
  });
};
