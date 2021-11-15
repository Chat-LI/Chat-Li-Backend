const { Server } = require('socket.io');

const io = new Server();

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);
  socket.on('message', (payload) => {
    io.emit('message', payload);
  });
});

io.listen(3000);
