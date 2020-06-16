//  Must be sent on frontend project
const socket = io(`http://localhost:3013`)
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const attachmentInput = document.getElementById('attachment-input')

const name = window.prompt('What is your name?')
// console.log(name)
// appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
  // console.log(data)
  appendMessage(`${data.name} sent: ${data.message}`)
})

socket.on('chat-attachment', data => {
  // console.log(data)
  appendAttachment(`${data.name} sent:<br>`, data.attachment)
})

// socket.on('user-connected', name => {
//   appendMessage(`${name} is connected.`)
// })

// socket.on('user-disconnected', name => {
//   // appendMessage(`${name} is disconnected.`)
// })

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const attachment = attachmentInput.value

  if(attachment !== '') {
    console.log('attachment')
    appendAttachment(`Vous avez envoyé un fichier:<br>`, attachment)
    socket.emit('send-chat-attachment', attachment)
    attachmentInput.value = ''
  }
  const message = messageInput.value
  if( message !== null) {
    appendMessage(`Vous: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
  }
})

function appendMessage (message) {
  const messageElement = document.createElement('div')
  messageElement.innerHTML = message
  messageContainer.append(messageElement)
}

function appendAttachment (text, attachment) {
  const attachmentElement = document.createElement('div')
  attachmentElement.innerHTML = `${text} ${attachment}`
  messageContainer.append(attachmentElement)
}
