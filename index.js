const { Server } = require('socket.io');

const io = new Server();

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);
});

io.listen(3000);
