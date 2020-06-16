// Attachments
const NewAttachment = require('../conversation/controllers/attachment/new')
const ShowAttachment = require('../conversation/controllers/attachment/show')
// Users
// const NewUser = require('./user/new')
const ShowUser = require('./user/show')
const EditUser = require('./user/edit')
const DeleteUser = require('./user/delete')
const ListUser = require('./user/list')
const EditUserPassword = require('./user/password/edit')

// Certifications
const NewCertification = require('./certification/new')
const ShowCertification = require('./certification/show')
const EditCertification = require('./certification/edit')
const DeleteCertification = require('./certification/delete')
const ListCertification = require('./certification/list')

// jobOffers
const NewJobOffer = require('./job-offer/new')
const ShowJobOffer = require('./job-offer/show')
const EditJobOffer = require('./job-offer/edit')
const DeleteJobOffer = require('./job-offer/delete')
const ListJobOffer = require('./job-offer/list')

// Emails
const NewEmail = require('./email/new')

// Messages
const NewMessage = require('../conversation/controllers/message/new')
const ShowMessage = require('../conversation/controllers/message/show')
const EditMessage = require('../conversation/controllers/message/edit')
const ListMessage = require('../conversation/controllers/message/list')
const DeleteMessage = require('../conversation/controllers/message/delete')

// Bills
const NewBill = require('./bill/new')
const ShowBill = require('./bill/show')
const EditBill = require('./bill/edit')
const DeleteBill = require('./bill/delete')
const ListBill = require('./bill/list')

//  Works
const NewWork = require('./work/new')
const ShowWork = require('./work/show')
const EditWork = require('./work/edit')
const ListWork = require('./work/list')
const DeleteWork = require('./work/delete')

module.exports = {
  attachments: {
    NewAttachment,
    ShowAttachment
  },
  users: {
    ShowUser,
    EditUser,
    DeleteUser,
    ListUser,
    EditUserPassword
  },
  certifications: {
    NewCertification,
    ShowCertification,
    EditCertification,
    DeleteCertification,
    ListCertification
  },
  jobOffers: {
    NewJobOffer,
    ShowJobOffer,
    EditJobOffer,
    DeleteJobOffer,
    ListJobOffer
  },
  emails: {
    NewEmail
  },
  messages: {
    NewMessage,
    ShowMessage,
    EditMessage,
    DeleteMessage,
    ListMessage
  },
  bills: {
    NewBill,
    ShowBill,
    EditBill,
    DeleteBill,
    ListBill
  },
  works: {
    NewWork,
    ShowWork,
    EditWork,
    DeleteWork,
    ListWork
  }
}
