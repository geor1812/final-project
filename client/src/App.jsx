import React from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'

import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'

import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Login from './components/Login'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Wrapper>
    </ThemeProvider>
  )
}

const Wrapper = styled.div`
  padding: 20px;
`

export default App
