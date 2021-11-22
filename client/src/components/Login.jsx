import React from 'react'
import {
  Container,
  Box,
  Card,
  TextField,
  Button,
  Stack,
  Typography,
} from '@mui/material'

const Login = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card
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
            <Button sx={{ width: '50%' }} variant="contained">
              Log in
            </Button>
          </Stack>
        </form>
      </Card>
    </Box>
  )
}

export default Login
