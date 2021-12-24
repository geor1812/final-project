import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import useToken from './useToken'

import styled from 'styled-components'
import {
  ThemeProvider,
  CssBaseline,
  Link,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material'
import theme from './theme'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'

import Home from './components/Home'
import Timeline from './components/timeline/Timeline'
import Auth from './components/auth/Auth'
import Sequencer from './components/sequencer/Sequencer'
import User from './components/user/User'

const App = () => {
  //Custom auth token hook
  const { token, setToken } = useToken()

  let navigate = useNavigate()

  const handleLogout = () => {
    setToken(null)
    sessionStorage.clear()
    navigate('/auth')
  }

  const handleUserIcon = () => {
    navigate(`/user/${token}`)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Wrapper>
        {['/', '/auth'].includes(window.location.pathname) ? null : (
          <>
            <Grid container>
              <Grid direction="row" alignItems="center" container xs={3}>
                <Tooltip title="Go to this user's page">
                  <IconButton
                    color="secondary"
                    component="span"
                    onClick={handleUserIcon}
                  >
                    <PersonIcon fontSize="large" color="secondary" />
                  </IconButton>
                </Tooltip>

                <Link
                  color="secondary"
                  href={`/user/${token}`}
                  underline="hover"
                  sx={{}}
                >
                  {sessionStorage.getItem('currentUser')}
                </Link>
              </Grid>
              <Grid item style={{ flexGrow: '1' }} />
              <Grid xs={3}>
                <Tooltip title="Logout">
                  <IconButton
                    sx={{ float: 'right' }}
                    color="secondary"
                    component="span"
                    onClick={handleLogout}
                  >
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </>
        )}
        <Routes>
          <Route exact path="/" element={<Home token={token} />} />
          <Route path="/sequencer" element={<Sequencer token={token} />} />
          <Route exact path="/timeline" element={<Timeline token={token} />} />
          <Route path="/auth" element={<Auth setToken={setToken} />} />
          <Route path="/user/:id" element={<User token={token} />} />
        </Routes>
      </Wrapper>
    </ThemeProvider>
  )
}

const Wrapper = styled.div`
  padding: 10px 20px;
`

export default App
