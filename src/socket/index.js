module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`);

    socket.on('message', ({ message, room }) => {
      io.to(room).emit('message', { username: socket.username, message });
    });

    socket.on('join', ({ room, username }) => {
      socket.join(room);
      if (username) {
        socket.username = username;
      }
      console.log(
        `${socket.username} (${socket.id}) just joined room [${room}]`
      );
      io.to(room).emit('user-connected', socket.username);
    });

    socket.on('leaveRoom', (room) => {
      socket.leave(room);
      console.log(`${socket.username} left room: ${room}`);
      io.to(room).emit('userLeftRoom', socket.username);
    });

    socket.on('quit', () => {
      console.log(`${socket.username} (${socket.id}) quit the chat`);
      socket.broadcast.emit('quit', socket.username);
      socket.disconnect(true);
    });

    socket.on('listUsers', () => {
      let allUsers = [];

      for (let [key, value] of io.of('/').sockets) {
        if (value.username) {
          allUsers.push(value.username);
        }
      }

      if (allUsers.length > 0) {
        io.to(socket.id).emit('listUsers', allUsers);
      }
    });

    socket.on('listRoomUsers', (room) => {
      try {
        let socketIds;
        let members = [];

        for (let [key, value] of io.of('/').adapter.rooms) {
          if (key.toLowerCase() === room) {
            socketIds = value;
          }
        }

        if (socketIds) {
          socketIds.forEach((socketId) => {
            let socketInRoom = io.of('/').sockets.get(socketId);
            members.push(socketInRoom.username);
          });

          io.to(socket.id).emit('listRoomUsers', { members, room });
        }
      } catch (err) {
        console.log(err);
      }
    });
  });
};
