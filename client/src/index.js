import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { StyledEngineProvider } from '@mui/material/styles'
import App from './App'

ReactDOM.render(
  <Router>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </Router>,
  document.getElementById('root'),
)
