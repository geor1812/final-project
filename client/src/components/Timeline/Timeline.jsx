import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Box, Grid } from '@mui/material'
import TrackCard from './TrackCard'

const mockData = [
  {
    title: 'Meadow',
    bpm: '80',
    layers: [
      {
        name: 'Bouncy Bass',
        user: 'gary123',
        instrument: 'Bass',
      },
      {
        name: 'Fun Melody',
        user: 'Ben254',
        instrument: 'Beep',
      },
      {
        name: 'Background Synth',
        user: 'Lin987',
        instrument: 'Boop',
      },
    ],
  },

  {
    title: 'After Dark',
    bpm: '100',
    layers: [
      {
        name: 'Bouncy Bass',
        user: 'Remi678',
        instrument: 'Bass',
      },
      {
        name: 'Subtle Synth',
        user: 'Lin987',
        instrument: 'CalmSynth',
      },
      {
        name: 'Extra Harmony',
        user: 'George721',
        instrument: 'Beep',
      },
    ],
  },
  {
    title: 'Anti-Blitzkrieg dominos',
    bpm: '72',
    layers: [
      {
        name: 'Groovy Bass',
        user: 'Remi678',
        instrument: 'Bass',
      },
      {
        name: 'Bells',
        user: 'George721',
        instrument: 'Bell',
      },
      {
        name: 'High Melody',
        user: 'gary123',
        instrument: 'SpaceSynth',
      },
    ],
  },
]

const Timeline = props => {
  const { token } = props
  let navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/auth')
    }
  })

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box sx={{ width: '1000px' }}>
          <Grid container spacing={5}>
            {mockData.map(track => {
              return (
                <Grid item>
                  <TrackCard track={track} />
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Timeline
