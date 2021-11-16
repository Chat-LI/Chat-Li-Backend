module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`);

    socket.on('message', (payload) => {
      io.emit('message', payload);
    });

    socket.on('join', (room) => {
      console.log('Yes! I just joined the room!', room);
      socket.join(room);
    });

    io.to('General Room 1').emit('Something');
  });
};
