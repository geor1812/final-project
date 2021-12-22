import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Box, Grid } from '@mui/material'
import TrackCard from './TrackCard'
import * as Tone from 'tone'
import Player from '../player/Player'

const mockData = [
  {
    title: 'Meadow',
    bpm: '80',
    layers: [
      {
        name: 'Bouncy Bass',
        user: 'gary123',
        instrument: 'Bass',
        sequence: [
          { step: 0, note: 'B5', activated: true, id: 0 },
          { step: 16, note: 'B5', activated: true, id: 16 },
          { step: 26, note: 'B5', activated: true, id: 26 },
          { step: 2, note: 'A5', activated: true, id: 4 },
          { step: 10, note: 'A5', activated: true, id: 12 },
          { step: 18, note: 'A5', activated: true, id: 20 },
          { step: 22, note: 'A5', activated: true, id: 24 },
          { step: 30, note: 'A5', activated: true, id: 32 },
          { step: 6, note: 'F#5', activated: true, id: 11 },
          { step: 14, note: 'F#5', activated: true, id: 19 },
          { step: 20, note: 'F#5', activated: true, id: 25 },
          { step: 28, note: 'F#5', activated: true, id: 33 },
        ],
        volume: -20,
      },
      {
        name: 'Beepy Beeps',
        user: 'gary123',
        instrument: 'Beep',
        sequence: [
          { step: 2, note: 'A5', activated: true, id: 0 },
          { step: 14, note: 'B5', activated: true, id: 16 },
          { step: 26, note: 'A5', activated: true, id: 26 },
          { step: 4, note: 'A5', activated: true, id: 4 },
          { step: 10, note: 'A5', activated: true, id: 12 },
          { step: 16, note: 'A5', activated: true, id: 20 },
          { step: 22, note: 'F#5', activated: true, id: 24 },
          { step: 30, note: 'A5', activated: true, id: 32 },
          { step: 6, note: 'F#5', activated: true, id: 11 },
          { step: 14, note: 'B5', activated: true, id: 19 },
          { step: 20, note: 'F#5', activated: true, id: 25 },
          { step: 28, note: 'F#5', activated: true, id: 33 },
        ],
        volume: -20,
      },
      {
        name: 'Beep Beeps',
        user: 'gary123',
        instrument: 'Beep',
        sequence: [
          { step: 2, note: 'D5', activated: true, id: 0 },
          { step: 14, note: 'B5', activated: true, id: 16 },
          { step: 26, note: 'D5', activated: true, id: 26 },
          { step: 0, note: 'D5', activated: true, id: 4 },
          { step: 10, note: 'D5', activated: true, id: 12 },
          { step: 16, note: 'D5', activated: true, id: 20 },
          { step: 22, note: 'F#5', activated: true, id: 24 },
          { step: 30, note: 'D5', activated: true, id: 32 },
          { step: 6, note: 'F#5', activated: true, id: 11 },
          { step: 14, note: 'B5', activated: true, id: 19 },
          { step: 20, note: 'F#5', activated: true, id: 25 },
          { step: 28, note: 'F#5', activated: true, id: 33 },
        ],
        volume: -20,
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
        sequence: [
          { step: 2, note: 'A5', activated: true, id: 0 },
          { step: 14, note: 'B5', activated: true, id: 16 },
          { step: 26, note: 'A5', activated: true, id: 26 },
          { step: 12, note: 'A5', activated: true, id: 4 },
          { step: 10, note: 'A5', activated: true, id: 12 },
          { step: 16, note: 'A5', activated: true, id: 20 },
          { step: 22, note: 'F#5', activated: true, id: 24 },
          { step: 30, note: 'A5', activated: true, id: 32 },
          { step: 6, note: 'F#5', activated: true, id: 11 },
          { step: 18, note: 'B5', activated: true, id: 19 },
          { step: 20, note: 'F#5', activated: true, id: 25 },
          { step: 28, note: 'F#5', activated: true, id: 33 },
        ],
        volume: 0,
      },
      {
        name: 'Subtle Synth',
        user: 'Lin987',
        instrument: 'Boop',
        sequence: [
          { step: 2, note: 'A5', activated: true, id: 0 },
          { step: 14, note: 'B5', activated: true, id: 16 },
          { step: 26, note: 'A5', activated: true, id: 26 },
          { step: 22, note: 'A5', activated: true, id: 4 },
          { step: 10, note: 'A5', activated: true, id: 12 },
          { step: 16, note: 'A5', activated: true, id: 20 },
          { step: 24, note: 'F#5', activated: true, id: 24 },
          { step: 30, note: 'A5', activated: true, id: 32 },
          { step: 6, note: 'F#5', activated: true, id: 11 },
          { step: 12, note: 'B5', activated: true, id: 19 },
          { step: 20, note: 'F#5', activated: true, id: 25 },
          { step: 28, note: 'F#5', activated: true, id: 33 },
        ],
        volume: 0,
      },
      {
        name: 'Extra Harmony',
        user: 'George721',
        instrument: 'Beep',
        sequence: [
          { step: 4, note: 'A5', activated: true, id: 0 },
          { step: 8, note: 'B5', activated: true, id: 16 },
          { step: 20, note: 'A5', activated: true, id: 26 },
          { step: 12, note: 'A5', activated: true, id: 4 },
          { step: 10, note: 'A5', activated: true, id: 12 },
          { step: 16, note: 'A5', activated: true, id: 20 },
          { step: 22, note: 'F#5', activated: true, id: 24 },
          { step: 30, note: 'A5', activated: true, id: 32 },
          { step: 6, note: 'F#5', activated: true, id: 11 },
          { step: 14, note: 'B5', activated: true, id: 19 },
          { step: 20, note: 'F#5', activated: true, id: 25 },
          { step: 28, note: 'F#5', activated: true, id: 33 },
        ],
        volume: 0,
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
  const [currentTrack, setCurrentTrack] = useState()
  const [play, setPlay] = useState(0)
  let navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/auth')
    }
  })

  const handlePlay = () => {
    Tone.start()
    setPlay(play + 1)
  }

  const handlePause = () => {
    Tone.Transport.stop()
  }

  const changeCurrentTrack = track => {
    setCurrentTrack(track)
  }

  return (
    <Container>
      <Player track={currentTrack} play={play}></Player>
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
                  <TrackCard
                    track={track}
                    handlePlay={handlePlay}
                    changeCurrentTrack={changeCurrentTrack}
                    handlePause={handlePause}
                  />
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
