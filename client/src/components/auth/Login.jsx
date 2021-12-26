import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Paper, TextField, Button, Stack, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import axios from 'axios'

const Login = props => {
  let navigate = useNavigate()

  const { setAlert, isSignup, setToken } = props
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = event => {
    event.preventDefault()
    axios({
      method: 'post',
      url: 'http://localhost:9000/auth/',
      data: {
        username: username,
        password: password,
      },
    })
      .then(res => {
        if (res.data.token) {
          setToken(res.data.token)
          sessionStorage.setItem('currentUser', res.data.username)
          navigate('/timeline')
        }
      })
      .catch(error => {
        setAlert({
          severity: 'error',
          message: error.response.data.message,
        })
      })
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
        <form onSubmit={handleLogin}>
          <Stack alignItems="center" spacing={3}>
            <Typography variant="h5">LOG IN</Typography>
            <Typography variant="p">Welcome to Newbie Steps</Typography>
            <TextField
              required
              sx={{ width: '75%' }}
              id="username"
              label="Username"
              variant="outlined"
              type="text"
              autoComplete="off"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              required
              sx={{ width: '75%' }}
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              sx={{ width: '50%' }}
              variant="contained"
              endIcon={<LoginIcon />}
              type="submit"
            >
              LOG IN
            </Button>
          </Stack>
        </form>
      </Paper>
      <Button
        sx={{ height: '75px' }}
        variant="contained"
        color="secondary"
        startIcon={<MusicNoteIcon />}
        onClick={() => {
          isSignup(true)
        }}
      >
        SIGN UP
      </Button>
    </>
  )
}

export default Login
