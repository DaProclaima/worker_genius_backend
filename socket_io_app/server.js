const dotenv = require('dotenv')
dotenv.config()

const io = require('socket.io')(process.env.SOCKET_IO_PORT)

io.on('connection', socket => {
  console.log('new user')
  socket.emit('chat message', 'hello world')
})