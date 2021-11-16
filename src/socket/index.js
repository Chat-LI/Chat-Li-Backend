module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`);

    socket.on('message', ({ user, message, room }) => {
      io.to(room).emit('message', { user, message });
    });

    socket.on('join', (room) => {
      console.log(`${socket.id} just joined room [${room}]`);
      socket.join(room);
      io.to(room).emit('user-connected', socket.id);
    });

    socket.on('quit', (payload) => {
      socket.broadcast.emit('quit', socket.id);
      socket.disconnect(true);
    });
  });
};
