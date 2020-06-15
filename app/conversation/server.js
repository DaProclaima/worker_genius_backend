const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const socketIo = require('socket.io')
const morgan = require('morgan')
const path = require('path')
// const conversationsRouter = require('./routes/conversations')
const users = {}
dotenv.config()

const host = process.env.DB_CONNECT || process.env.DB_CONNECT_LOCAL
const connect = mongoose.createConnection(host, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

connect.on('error', (err) => {
  setTimeout(() => {
    console.log('[ERROR] api dbConnect() -> mongodb error')
    this.connect = this.dbConnect(host)
  }, 5000)

  console.error(`[ERROR] api dbConnect() -> ${err}`)
})

connect.on('disconnected', () => {
  setTimeout(() => {
    console.log('[DISCONNECTED] api dbConnect() -> mongodb disconnected')
    this.connect = this.dbConnect(host)
  }, 5000)
})

process.on('SIGINT', () => {
  connect.close(() => {
    console.log('[API END PROCESS] api dbConnect() -> close mongodb connection ')
    process.exit(0)
  })
})

try {
  try {
    const io = socketIo.listen(process.env.SOCKET_IO_PORT || 3012)
    console.log(`SocketIO service server running on port ${process.env.SOCKET_IO_PORT || 3013}`)
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
  server.use(morgan('combined'))
  server.use(bodyParser.urlencoded({ 'extended': true }))
  server.use(bodyParser.json())
  server.use('/socket', express.static(path.join(__dirname, './')))

  // server.use('/conversations', conversationsRouter)
  server.get('/conversations', async (req, res) => {
    // res.json({ok: 'ok'})
    res.sendFile( path.join(__dirname,'./index.html'))
  })

  server.use((_, res) => {
    res.status(404).json({
      'code': 404,
      'message': 'Route not Found'
    })
  })
  
  server.listen(process.env.DISCUSSION_PORT || 3012, () => console.log(`Conversation server listening on port ${process.env.DISCUSSION_PORT || 3012} and dirname is ${__dirname}`))
} catch (e) {
  console.error(e)
}
