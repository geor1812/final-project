import React from 'react'
import { Paper, TextField, Button, Stack, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import MusicNoteIcon from '@mui/icons-material/MusicNote'

const Login = props => {
  return (
    <>
      <Paper
        sx={{ padding: '20px', pt: '50px', width: '500px', height: '500px' }}
      >
        <form>
          <Stack alignItems="center" spacing={3}>
            <Typography variant="h5">LOG IN</Typography>
            <Typography variant="p">Welcome to name-goes-here</Typography>
            <TextField
              required
              sx={{ width: '75%' }}
              id="username"
              label="Username"
              variant="outlined"
              //error={true}
              type="text"
              autoComplete="off"
            />
            <TextField
              required
              sx={{ width: '75%' }}
              id="password"
              label="Password"
              variant="outlined"
              type="password"
            />
            <Button
              sx={{ width: '50%' }}
              variant="contained"
              endIcon={<LoginIcon />}
            >
              Log in
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
          props.isSignup(true)
        }}
      >
        Sign Up
      </Button>
    </>
  )
}

export default Login
