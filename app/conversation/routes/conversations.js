let express = require('express')
let router = express.Router()

router.get('/conversations', async (req, res) => {
  // res.sendFile('./index.html')
  res.json({ok: 'ok'})
})

module.exports = router
