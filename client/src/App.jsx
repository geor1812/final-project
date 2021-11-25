import React from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'

import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'

import Home from './components/Home'
import Timeline from './components/Timeline'
import Auth from './components/auth/Auth'

const App = () => {
  //const [token, setToken] = useState()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Wrapper>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/timeline" element={<Timeline />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Wrapper>
    </ThemeProvider>
  )
}

const Wrapper = styled.div`
  padding: 20px;
`

export default App
