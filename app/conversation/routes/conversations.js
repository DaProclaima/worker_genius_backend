var express = require('express')
var router = express.Router()

router.get('/conversations', async (req, res) => {
  // res.sendFile('./index.html')
  res.json({ok: 'ok'})
})

module.exports = router
