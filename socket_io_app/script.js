const dotenv = require('dotenv')
dotenv.config()

const socket = io(`http://localhost:${process.env.SOCKET_IO_PORT}`)

socket.on('chat-message', data => {
  console.log(data)
})