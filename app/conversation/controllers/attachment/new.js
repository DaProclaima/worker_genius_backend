const Attachment = require('../../models/attachment')
const path = require('path')
const multer = require('multer')
const upload = multer({ dest: path.join(__dirname, '../../../../uploads/attachments') })

/**
 * New
 * @class
 */
class New {
  constructor (app, connect, apiPrefix) {
    this.app = app
    this.apiPrefix = apiPrefix
    this.AttachmentModel = connect.model('Attachment', Attachment)
    this.run()
  }

  /**
   * middleware
   */
  async fileManager (req, res, next) {
    const files = req.files
    const path = require('path')
    const fileUpload = require('express-fileupload')
    const express = require('express')
    const app = express()
    app.use(fileUpload())
    console.log(req)
    // await res.status(201).send({ req: files })
    if (!files || Object.keys(files).length === 0) {
      return res.status(400).send('No files were uploaded.')
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = files.sampleFile
    // Use the mv() method to place the file somewhere on your server
    let filePath = `${path.join(__dirname, './uploads')}/${req.body.params.attachments}`
    sampleFile.mv(filePath, (err) => {
      if (err) {
        return {
          success: false,
          message: err,
          res: res
        }
      }
      return {
        success: true,
        message: 'ok',
        path: filePath,
        res: res
      }
    })
  }
  //
  /**
   * middleware
   */
  middleware () {
    // TODO: add roomId and expeditorId to name
    this.app.post(`${this.apiPrefix}/attachment/new`, upload.single(`${Date.now()}_attachment`), async (req, res) => {
      try {
        console.log(req.body)
        // await (res.status(201).send({ body: req.body, file: req.file }))
        // const uploadedFile = this.fileManager(req, res)
        // await res.status(201).send({ req: uploadedFile })
        // if (uploadedFile.path === null) {
        //   return res.status(uploadedFile)
        // }
        // console.log(uploadedFile)
        // const attachmentModel = new this.AttachmentModel({
        //   title: '',
        //   receiver_id: '',
        //   owner_id: '',
        //   path: uploadedFile.path
        // })
        // await res.status(201).send({ attachmentModel })
        // attachmentModel.save()
        // // throw new Error('Error from server while processing new job offer creation.')
      } catch (err) {
        console.error(err) // For debugging reasons

        return res.status(500).send({
          error: 'GENERIC',
          description: 'Something went wrong. Please try again or contact support.'
        })
      }
    })
  }

  /**
   * run
   */
  run () {
    this.middleware()
  }
}

module.exports = New
