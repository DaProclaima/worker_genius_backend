const NewAttachments = require('./attachment/new')
const ShowAttachments = require('./attachment/show')
const NewMessages = require('./message/new')
const ShowMessages = require('./message/show')
const ListMessages = require('./message/list')

module.exports = {
  attachments: {
    NewAttachments,
    ShowAttachments
  },
  messages: {
    NewMessages,
    ShowMessages,
    ListMessages
  }
}
