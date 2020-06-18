// const axios = require('axios')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const socketIo = require('socket.io')
const Chat = require('./models/chat')
// const morgan = require('morgan')
// const path = require('path')
// const fileUpload = require('express-fileupload')
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
  const server = express()
  let ChatModel = connect.model('Chat', Chat)
  // server.use(morgan('combined'))
  server.use(bodyParser.urlencoded({ 'extended': true }))
  server.use(bodyParser.json())
  // server.use('/socket', express.static(path.join(__dirname, './')))

  // server.get('/conversations-test', async (req, res) => {
  //   // res.json({ok: 'ok'})
  //   res.sendFile(path.join(__dirname, './index.html'))
  // })

  server.use((_, res) => {
    res.status(404).json({
      'code': 404,
      'message': 'Route not Found'
    })
  })
  server.listen(process.env.DISCUSSION_PORT || 3012, () =>
    console.log(`Conversation server listening on port ${process.env.DISCUSSION_PORT || 3012}
     and dirname is ${__dirname}`))

  try {
    const io = socketIo.listen(process.env.SOCKET_IO_PORT || 3012)
    console.log(`SocketIO service server running on port ${process.env.SOCKET_IO_PORT || 3013}`)
    io.on('connection', socket => {
      socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)

        ChatModel.find({})
        // .populate('sender')
          .exec((err, doc) => {
            if (err) {
              console.error(err)
            }
            let data = {
              userData: {
                id: 1,
                username: 'falinso'
              }
            }
            console.log(doc)
            // doc.getSender()
            return socket.broadcast.emit('chat-message', {data: data, doc: doc})
          })
      })
      // console.log('New User')
      // socket.emit('chat-message', 'Hello World')
      socket.on('send-chat-message', data => {
        console.log(data)
        try {
          const chatModel = new ChatModel({message: data.message, sender: data.user_id})
          chatModel.save((err, doc) => {
            if (err) {
              console.error(err)
            }
            if (doc) {
              ChatModel.find({'_id': doc._id})
                // .populate('sender')
                .exec((err, doc) => {
                  if (err) {
                    console.error(err)
                  }
                  console.log(doc)
                  return socket.broadcast.emit('chat-message', {data: data, doc: doc})
                })
            }
          })
        } catch (error) {
          console.log(error)
        }
        // socket.broadcast.emit('chat-message', {
        //   message: data.message,
        //   attachment: data.attachment,
        //   name: users[socket.id]
        // })
      })

      socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
      })
    })
  } catch (e) {
    console.log(e)
  }
} catch (e) {
  console.error(e)
}
