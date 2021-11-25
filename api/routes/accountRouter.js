const express = require('express')
const router = express.Router()
const accountData = require('../data/accountData')
const Account = require('../models/Account')

router.get('/', async (req, res) => {
  try {
    const accounts = await Account.find()
    res.send({ accounts: accounts })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  const account = req.body.account
  try {
    const createdAccount = await accountData.create(account)
    res.status(201).send({ createdAccount: createdAccount })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

module.exports = router
