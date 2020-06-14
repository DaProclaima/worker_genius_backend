const dotenv = require('dotenv')
const socketIo = require('socket.io')
const users = {}

dotenv.config()
try {
  const io = socketIo.listen(process.env.SOCKET_IO_PORT)
  console.log(`Discussion server running on port ${process.env.SOCKET_IO_PORT}`)
  io.on('connection', socket => {
    socket.on('new-user', name => {
      users[socket.id] = name
      socket.broadcast.emit('user-connected', name)
    })
    // console.log('New User')
    // socket.emit('chat-message', 'Hello World')
    socket.on('send-chat-message', message => {
      // console.log(message)
      socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    })

    socket.on('disconnect', () => {
      socket.broadcast.emit('user-disconnected', users[socket.id])
      delete users[socket.id]
    })
  })
} catch (e) {
  console.log(e)
}
