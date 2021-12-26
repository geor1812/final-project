import React, { useState } from 'react'
import axios from 'axios'
import { Paper, TextField, Button, Stack, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import {
  usernameValidation,
  emailValidation,
  passwordMatch,
  passwordValidation,
} from './validation'

const Signup = props => {
  const { setAlert, isSignup } = props

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const [usernameError, setUsernameError] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [repeatPasswordError, setRepeatPasswordError] = useState(null)

  const validateInput = () => {
    if (
      !usernameError &&
      !emailError &&
      !passwordError &&
      !repeatPasswordError
    ) {
      return true
    }
    console.log(false)
    return false
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (validateInput()) {
      axios({
        method: 'post',
        url: 'http://localhost:9000/accounts/',
        data: {
          username: username,
          email: email,
          password: password,
        },
      })
        .then(res => {
          if (res.data.createdAccount) {
            setAlert({
              severity: 'success',
              message: 'Account created successfully! You can now log in.',
            })
            isSignup(false)
          }
        })
        .catch(error => {
          setAlert({
            severity: 'error',
            message: error.response.data.message,
          })
        })
    }
  }

  return (
    <>
      <Paper
        sx={{
          padding: '20px',
          pt: '50px',
          width: '500px',
          height: '500px',
          boxShadow: '5px 10px 15px 10px #170a1c',
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack alignItems="center" spacing={2}>
            <Typography variant="h5">SIGN UP</Typography>
            <Typography variant="p">
              Please fill out the fields below
            </Typography>
            <TextField
              required
              sx={{ width: '75%' }}
              id="username"
              label="Username"
              variant="outlined"
              type="text"
              autoComplete="nope"
              size="small"
              value={username}
              error={usernameError ? true : false}
              helperText={usernameError}
              onChange={e => setUsername(e.target.value)}
              onBlur={() => {
                setUsernameError(usernameValidation(username))
              }}
            />
            <TextField
              required
              sx={{ width: '75%' }}
              id="email"
              label="Email"
              variant="outlined"
              type="email"
              autoComplete="nope"
              size="small"
              value={email}
              error={emailError ? true : false}
              helperText={emailError}
              onChange={e => setEmail(e.target.value)}
              onBlur={() => {
                setEmailError(emailValidation(email))
              }}
            />
            <TextField
              required
              sx={{ width: '75%' }}
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              size="small"
              value={password}
              error={passwordError ? true : false}
              helperText={passwordError}
              onChange={e => setPassword(e.target.value)}
              onBlur={() => {
                setPasswordError(passwordValidation(password))
              }}
            />
            <TextField
              required
              sx={{ width: '75%' }}
              id="repeatPassword"
              label="Repeat password"
              variant="outlined"
              type="password"
              size="small"
              value={repeatPassword}
              error={repeatPasswordError ? true : false}
              helperText={repeatPasswordError}
              onChange={e => setRepeatPassword(e.target.value)}
              onBlur={() => {
                setRepeatPasswordError(
                  passwordMatch(password, repeatPassword)
                    ? passwordMatch(password, repeatPassword)
                    : passwordValidation(repeatPassword),
                )
              }}
            />
            <Button
              sx={{ width: '50%' }}
              variant="contained"
              type="submit"
              endIcon={<MusicNoteIcon />}
            >
              SIGN UP
            </Button>
          </Stack>
        </form>
      </Paper>
      <Button
        sx={{ height: '75px' }}
        variant="contained"
        color="secondary"
        startIcon={<LoginIcon />}
        onClick={() => {
          isSignup(false)
        }}
      >
        LOG IN
      </Button>
    </>
  )
}

export default Signup
