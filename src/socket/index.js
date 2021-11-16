module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`);

    socket.on('message', (payload) => {
      io.emit('message', payload);
    });

    socket.on('join', (room) => {
      console.log(`${socket.id} just joined room [${room}]`);
      socket.join(room);
    });

    socket.on('quit', (payload) => {
      socket.broadcast.emit('quit', socket.id);
      socket.disconnect(true);
    });

    io.to('General Room 1').emit('user-connected', socket.id);
  });
};
