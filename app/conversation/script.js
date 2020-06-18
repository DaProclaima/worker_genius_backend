//  Must be sent on frontend project

const socket = io(`http://localhost:3013`)
formData = new FormData()
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const attachmentInput = document.getElementById('attachment-input')

const user = {
  userData: {
    id: 1,
    username: 'falinso'
  }
}

const name = window.prompt('What is your name?')
console.log(name)
// appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
  console.log(data)
  // if(data.attachment !== undefined || '' || null)
    appendMessage(`${data.data.username} : ${data.doc[0].message}`)

  // appendMessage(`${data.name} sent: ${data.message}`)
})



// socket.on('user-connected', name => {
//   appendMessage(`${name} is connected.`)
// })

// socket.on('user-disconnected', name => {
//   // appendMessage(`${name} is disconnected.`)
// })
async function sendDatas() {
  const instance = axios.create({
    baseURL: 'http://localhost:3010',
    timeout: 1000,
    headers: {"Access-Control-Allow-Origin": "*"}
  });

  const attachmentName = attachmentInput.value

  const message = messageInput.value
  // if( message !== null) {
  appendMessage(`Vous: ${message}`)
  socket.emit('send-chat-message', {
    user_id: user.userData.id,
    username: user.userData.username,
    message: message,
    attachment: attachmentInput.files[0]
  })
  messageInput.value = ''

  // if(attachmentName !== '' && message === '') {

    // formData.append("file", attachmentInput.files[0])
  // await instance.post('/api/v1/attachment/new', attachmentInput.files[0], {
  //   req: {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     },
  //     body: {
  //       file: {
  //         media: attachmentInput.files[0],
  //         name: attachmentName
  //       }
  //     }
  //   }
  // })
  //   .then(function (response) {
  //     console.log(response)})
  //   .catch(function (error) {
  //     console.log(error)
  //   })

    // appendAttachment(`Vous avez envoyé un fichier:<br>`, attachmentName)
    // socket.emit('send-chat-attachment', {attachmentName})
    attachmentInput.value = ''
  // }
}
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  sendDatas()
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
