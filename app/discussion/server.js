const dotenv = require('dotenv')
const express = require('express')
const socketIo = require('socket.io')
const bodyParser = require('body-parser')
const users = {}
dotenv.config()

try {
  try {
    const io = socketIo.listen(process.env.SOCKET_IO_PORT || 3012)
    console.log(`SocketIO service server running on port ${process.env.SOCKET_IO_PORT || 3013} 
and Discussion server running on port ${process.env.DISCUSSION_PORT || 3012} `)
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
  const server = express()
  server.use(bodyParser.urlencoded({ 'extended': true }))
  server.use(bodyParser.json())
  server.use((_, res) => {
    res.status(404).json({
      'code': 404,
      'message': 'Route not Found'
    })
  })

  server.listen(process.env.DISCUSSION_PORT || 3012, () => console.log(`Discussion server listening on port ${process.env.DISCUSSION_PORT || 3012} and dirname is ${__dirname}`))
} catch (e) {
  console.error(e)
}
