const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Account = require('../models/Account')

const SALT_ROUNDS = 10

/**Get all accounts*/
router.get('/', async (req, res) => {
  try {
    const accounts = await Account.find()
    res.send({ accounts: accounts })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

/**Get account by id */
router.get('/:id', async (req, res) => {
  try {
    const account = await Account.findById(req.params.id)
    res.send({ account: account })
  } catch (error) {
    res.status(500).send({ error: message })
  }
})

/**Create new account  */
router.post('/', async (req, res) => {
  try {
    //Check for duplicate username or email
    const account = await Account.find({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    }).exec()
    if (account.length !== 0) {
      console.log(account)
      res
        .status(403)
        .send({ message: 'Username or email address is already in use' })
    } else {
      //Password hashing
      bcrypt.genSalt(SALT_ROUNDS, (error, salt) => {
        bcrypt.hash(req.body.password, salt, async (error, hash) => {
          const account = new Account({
            username: req.body.username,
            email: req.body.email,
            salt: salt,
            hash: hash,
          })

          const createdAccount = await account.save()
          res.status(201).send({ createdAccount: createdAccount })
        })
      })
    }
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

module.exports = router
