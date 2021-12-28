import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material'
import TrackCard from './TrackCard'
import * as Tone from 'tone'
import Player from '../player/Player'
import axios from 'axios'
import SchoolIcon from '@mui/icons-material/School'
import MusicNoteIcon from '@mui/icons-material/MusicNote'

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
    Tone.Transport.stop()
  }, [window.location.pathname])

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

  const handleCreate = () => {
    navigate('/sequencer')
  }

  const handleLearn = () => {
    navigate('/learn')
  }

  return (
    <Container>
      <Player track={currentTrack} play={play}></Player>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{ margin: '40px', mr: '150px', mt: '0px' }}
        >
          <IconButton onClick={handleCreate} color="primary">
            <MusicNoteIcon sx={{ fontSize: '70px' }} />
          </IconButton>
          <Typography color="primary">CREATE</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{ margin: '40px', ml: '150px', mt: '0px' }}
        >
          <IconButton onClick={handleLearn} color="tertiary">
            <SchoolIcon sx={{ fontSize: '70px' }} />
          </IconButton>
          <Typography color="#dd517e">LEARN</Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Box sx={{ width: '1000px' }}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={5}
          >
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
