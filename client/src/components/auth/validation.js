export const usernameValidation = username => {
  if (username.trim() === '') {
    return 'Username is required'
  }
  if (!/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username)) {
    return 'Invalid characters'
  }
  if (username.trim().length < 3) {
    return 'Username needs to be at least three characters'
  }
  return null
}

export const emailValidation = email => {
  if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
    return null
  }
  if (email.trim() === '') {
    return 'Email is required'
  }
  return 'Please enter a valid email'
}

export const passwordValidation = password => {
  if (password.trim().length < 8 || password.trim().length > 30) {
    return 'Password must be between 8 and 30 characters'
  }
}

export const passwordMatch = (password, repeatPassword) => {
  if (password === repeatPassword) {
    return null
  } else {
    return 'Passwords must match'
  }
}
