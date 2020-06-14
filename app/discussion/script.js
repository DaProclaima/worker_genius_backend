const socket = io(`http://localhost:3011`)
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name?')
// console.log(name)
appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
  console.log(data)
  appendMessage(`${data.name} sent: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} is connected.`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} is disconnected.`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  // console.log(message)
  appendMessage(`You sent: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerHTML = message
  messageContainer.append(messageElement)
}
