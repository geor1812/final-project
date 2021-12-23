import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Box, Grid } from '@mui/material'
import TrackCard from './TrackCard'
import * as Tone from 'tone'
import Player from '../player/Player'
import axios from 'axios'

const Timeline = props => {
  const { token } = props
  const [tracks, setTracks] = useState()
  const [currentTrack, setCurrentTrack] = useState()
  const [play, setPlay] = useState(0)
  let navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/auth')
    }
  })

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:9000/tracks`,
    })
      .then(res => {
        setTracks(res.data.tracks)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

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
            {tracks ? (
              tracks.map(track => {
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
              })
            ) : (
              <div></div>
            )}
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Timeline