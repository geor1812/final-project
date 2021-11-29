import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Timeline = props => {
  const { token } = props
  let navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/auth')
    }
  })

  return <h1>Timeline</h1>
}

export default Timeline
