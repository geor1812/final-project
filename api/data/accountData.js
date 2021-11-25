const Account = require('../models/Account')

const create = async ({ username, email, password }) => {
  const account = new Account({
    username: username,
    email: email,
  })
  account.setPassword(password)
  console.log('the password is the same: ', account.validPassword(password))
  await account.save()
}

module.exports = {
  create: create,
}
