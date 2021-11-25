import React, { useState } from 'react'
import { Box } from '@mui/material'
import Login from './Login'
import Signup from './Signup'
const Auth = props => {
  const [signup, isSignup] = useState(props.signup)
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        {signup ? (
          <Signup isSignup={isSignup} />
        ) : (
          <Login isSignup={isSignup} />
        )}
      </Box>
    </>
  )
}

export default Auth
