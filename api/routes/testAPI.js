var express = require('express')
var router = express.Router()

router.get('/', (req, res, next) => {
  res.send('2 10 2 10')
})

module.exports = router
