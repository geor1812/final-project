import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './components/Home'
import Dashboard from './components/Dashboard'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
