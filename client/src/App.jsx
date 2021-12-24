import React from 'react'
import { Route, Routes } from 'react-router-dom'
import useToken from './useToken'

import styled from 'styled-components'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'

import Home from './components/Home'
import Timeline from './components/timeline/Timeline'
import Auth from './components/auth/Auth'
import Sequencer from './components/sequencer/Sequencer'

const App = () => {
  //Custom auth token hook
  const { token, setToken } = useToken()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Wrapper>
        <Routes>
          <Route exact path="/" element={<Home token={token} />} />
          <Route path="/sequencer" element={<Sequencer token={token} />} />
          <Route exact path="/timeline" element={<Timeline token={token} />} />
          <Route path="/auth" element={<Auth setToken={setToken} />} />
        </Routes>
      </Wrapper>
    </ThemeProvider>
  )
}

const Wrapper = styled.div`
  padding: 20px;
`

export default App
