import React, { useState } from 'react'
import { Box, Alert, Container } from '@mui/material'
import Login from './Login'
import Signup from './Signup'
const Auth = props => {
  const { setToken } = props

  const [signup, isSignup] = useState(props.signup)
  const [alert, setAlert] = useState(null)

  return (
    <Container>
      {alert ? (
        <Box justifyContent="center" display="flex">
          <Alert
            sx={{ width: '100%' }}
            variant="filled"
            severity={alert.severity}
          >
            {alert.message}
          </Alert>
        </Box>
      ) : null}

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        {signup ? (
          <Signup setAlert={setAlert} isSignup={isSignup} />
        ) : (
          <Login isSignup={isSignup} setToken={setToken} setAlert={setAlert} />
        )}
      </Box>
    </Container>
  )
}

export default Auth
